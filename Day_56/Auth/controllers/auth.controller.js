const bcrypt = require("bcrypt");
const { string } = require("yup");
const { Op, where } = require("sequelize");
const { User, Device } = require("../models/index");
const DeviceDetector = require("device-detector-js");
const deviceDetector = new DeviceDetector();

module.exports = {
  index: (req, res, next) => {
    return res.redirect("auth/login");
  },
  login: (req, res, next) => {
    // console.log(req.session.userEmail);
    const errorMsg = req.flash("errorMsg");
    const successMsg = req.flash("successMsg");
    res.render("auth/login", {
      req,
      errorMsg,
      successMsg,
    });
  },
  handleLogin: async (req, res, next) => {
    const rule = {
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng"),
      password: string().required("Mật khẩu bắt buộc phải nhập"),
    };
    const body = await req.validate(req.body, rule);
    if (body) {
      try {
        let user = await User.findOne({
          where: {
            email: {
              [Op.iLike]: `%${body.email}%`,
            },
          },
          include: {
            model: Device,
            as: "devices",
          },
        });
        const userInstance = user;
        if (user) {
          user = user?.dataValues;
          const result = await bcrypt.compare(body.password, user.password);
          if (!result) {
            req.flash("errorMsg", "Tài khoản hoặc mật khẩu không chính xác");
          } else {
            await User.update(
              {
                status: true,
              },
              {
                where: {
                  email: {
                    [Op.iLike]: `%${user.email}%`,
                  },
                },
              }
            );
            const userAgent = req.get("user-agent");
            const device = deviceDetector.parse(userAgent);
            const checkDevice = userInstance.devices.find((device) => {
              return device.user_agent === req.get("user-agent");
            });
            if (checkDevice) {
              await Device.update(
                {
                  status: true,
                },
                {
                  where: {
                    id: checkDevice.id,
                    user_agent: req.get("user-agent"),
                  },
                }
              );
            } else {
              const deviceInstance = await Device.create({
                browser: device.client.name,
                operating_system: device.os.name,
                device_type: device.device.type,
                status: true,
                user_agent: req.get("user-agent"),
              });
              await userInstance.addDevices(deviceInstance);
            }

            req.flash("successMsg", "Đăng nhập thành công");
            const userInfo = {
              name: user.name,
              email: user.email,
            };
            req.session.userInfo = userInfo;
          }
        } else {
          req.flash("errorMsg", "Tài khoản hoặc mật khẩu không chính xác");
        }
      } catch (e) {
        return next(e);
      }
    } else {
      req.flash("errorMsg", "Vui lòng nhập đầy đủ thông tin đăng nhập");
    }

    return res.redirect("/auth/login");
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
      const user = await User.create({
        name: body.name,
        email: body.email,
        password: body.password,
      });

      req.flash("successMsg", "Đăng ký tài khoản thành công");
      return res.redirect("/auth/login");
    } else {
      req.flash("errorMsg", "Vui lòng nhập đầy đủ thông tin đăng nhập");
    }

    return res.redirect("/auth/register");
  },
};
