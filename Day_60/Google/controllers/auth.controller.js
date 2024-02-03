const bcrypt = require("bcrypt");
const { string } = require("yup");
const { Op, where } = require("sequelize");
const { User, Provider } = require("../models/index");
const md5 = require("md5");
const sendMail = require("../utils/mail");

module.exports = {
  login: (req, res) => {
    const error = req.flash("error");
    res.render("auth/login", {
      error,
    });
  },
  register: (req, res, next) => {
    const errorMsg = req.flash("errorMsg");
    res.render("auth/register", {
      req,
      errorMsg,
    });
  },
  handleRegister: async (req, res, next) => {
    const rule = {
      name: string()
        .min(5, "Tên phải từ năm ký tự")
        .required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng")
        .test("validate-emailExist", "Email đã tồn tại", async (value) => {
          if (!value) {
            return true;
          }
          const user = await User.findOne({
            where: {
              email: {
                [Op.iLike]: `%${value}%`,
              },
            },
          });
          if (user) {
            return false;
          }
          return true;
        }),
      password: string()
        .test(
          "validate-password",
          "Tối thiểu tám ký tự, ít nhất một chữ cái và một số:))",
          (value) => {
            const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            return pattern.test(value);
          }
        )
        .required("Mật khẩu bắt buộc phải nhập"),
      passwordRetype: string()
        .test(
          "validate-password",
          "Mật khẩu nhập lại không chính xác",
          (value) => {
            if (value === req.body.password) {
              return true;
            }
            return false;
          }
        )
        .required("Mật khẩu bắt buộc phải nhập lại"),
    };

    const body = await req.validate(req.body, rule);
    if (body) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(body.password, salt);
      body.password = hashPassword;
      const provider = await Provider.findOne({
        where: {
          name: {
            [Op.iLike]: `email`,
          },
        },
      });
      if (provider) {
        const user = await User.create({
          name: body.name,
          email: body.email,
          password: body.password,
          provider_id: provider.id,
        });
      } else {
        const emailProvider = await Provider.create({
          name: "email",
        });
        const user = await User.create({
          name: body.name,
          email: body.email,
          password: body.password,
          provider_id: emailProvider.id,
        });
      }
      req.flash("successMsg", "Đăng ký tài khoản thành công");
      return res.redirect("/auth/login");
    } else {
      req.flash("errorMsg", "Vui lòng nhập đầy đủ thông tin đăng nhập");
    }

    return res.redirect("/auth/register");
  },
  forgotPassword: (req, res, next) => {
    const errorMsg = req.flash("errorMsg");
    const successMsg = req.flash("successMsg");
    res.render("auth/forgot", {
      errorMsg,
      successMsg,
    });
  },
  handleForgotPassword: async (req, res, next) => {
    const user = await User.findOne({
      where: {
        email: {
          [Op.iLike]: `%${req.body.email}%`,
        },
      },
    });
    if (user) {
      const reset_token = md5(Math.random() + new Date().getTime());
      const milliseconds = new Date().getTime() + 900000;
      const time = new Date(milliseconds);
      const expired_token = `${time.getFullYear()}-${
        time.getMonth() + 1
      }-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}(${time})`;
      await User.update(
        {
          reset_token,
          expired_token,
        },
        {
          where: {
            email: {
              [Op.iLike]: `%${req.body.email}%`,
            },
          },
        }
      );
      const subject = `Reset your password`;
      const message = `<a href="https://google-seven-gamma.vercel.app/auth/reset-password?email=${req.body.email}&reset_token=${reset_token}" class="btn btn-danger mt-2 w-100">Click here to reset your password</a>`;
      const info = await sendMail(req.body.email, subject, message);
      if (info) {
        req.flash("successMsg", "Please check your email!");
      }
    } else {
      req.flash("errorMsg", "Email not exist");
    }
    return res.redirect("/auth/forgot-password");
  },
  resetPassword: async (req, res, next) => {
    const { email, reset_token } = req.query;
    let user;
    try {
      user = await User.findOne({
        where: {
          email: {
            [Op.iLike]: `%${email}%`,
          },
        },
      });
    } catch (e) {
      next(e);
    }
    if (user.reset_token !== reset_token) {
      res.send("Token not exist");
    }
    const expired_time = user.expired_token.slice(
      user.expired_token.indexOf("(") + 1,
      user.expired_token.lastIndexOf("(") - 1
    );
    const currentMilliseconds = new Date().getTime();
    const expiredTokenMilliseconds = new Date(expired_time);
    if (currentMilliseconds >= expiredTokenMilliseconds.getTime()) {
      res.send("Token has expired");
    }
    const errorMsg = req.flash("errorMsg");
    res.render("auth/reset", {
      req,
      errorMsg,
    });
  },
  handleResetPassword: async (req, res, next) => {
    const { email, reset_token } = req.query;
    const rule = {
      password: string()
        .test(
          "validate-password",
          "Tối thiểu tám ký tự, ít nhất một chữ cái và một số:))",
          (value) => {
            const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            return pattern.test(value);
          }
        )
        .required("Mật khẩu bắt buộc phải nhập"),
      passwordRetype: string()
        .test(
          "validate-password",
          "Mật khẩu nhập lại không chính xác",
          (value) => {
            if (value === req.body.password) {
              return true;
            }
            return false;
          }
        )
        .required("Mật khẩu bắt buộc phải nhập lại"),
    };
    const body = await req.validate(req.body, rule);
    if (body) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(body.password, salt);
        await User.update(
          {
            password: hashPassword,
            reset_token: null,
            expired_token: null,
          },
          {
            where: {
              email: {
                [Op.iLike]: `%${email}%`,
              },
            },
          }
        );
        const subject = `Reset password success`;
        const message = `
          <a href="https://google-seven-gamma.vercel.app/auth/login" class="btn btn-danger mt-2 w-100">Congratulations, you have successfully changed your password. Log in now!</a>
          `;
        const info = await sendMail(email, subject, message);
        return res.redirect("/auth/login");
      } catch (e) {
        next(e);
      }
    } else {
      return res.redirect(
        `/auth/reset-password?email=${email}&reset_token=${reset_token}`
      );
    }
  },
};
