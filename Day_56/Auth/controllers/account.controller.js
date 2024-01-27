const { string } = require("yup");
const { Op, where } = require("sequelize");
const { User, Device } = require("../models/index");
const bcrypt = require("bcrypt");

module.exports = {
  index: (req, res, next) => {
    const msg = req.flash("msg");
    req.olds = req?.session?.userInfo;
    res.render("account/index", {
      req,
      msg,
    });
  },
  handleInfo: async (req, res, next) => {
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
          if (value === req.session?.userInfo?.email) {
            return true;
          }
          const user = await User.findOne({
            where: {
              email: {
                [Op.iLike]: `%${req.body.email}%`,
              },
            },
          });
          if (user) {
            return false;
          }
          return true;
        }),
    };

    const body = await req.validate(req.body, rule);

    if (body) {
      try {
        const status = await User.update(
          {
            name: body.name,
            email: body.email,
          },
          {
            where: {
              email: {
                [Op.iLike]: `%${req.session?.userInfo?.email}%`,
              },
              status: true,
            },
          }
        );
        if (status) {
          req.flash("msg", "Cập nhật thành công");
          req.session.userInfo = body;
        }
      } catch (e) {
        next(e);
      }
    }

    return res.redirect("/account");
  },
  changePassword: (req, res, next) => {
    const msg = req.flash("msg");
    res.render("account/password", {
      req,
      msg,
    });
  },
  handleChangePassword: async (req, res, next) => {
    const rule = {
      passwordOld: string()
        .test(
          "validate-password",
          "Mật khẩu không chính xác",
          async (value) => {
            if (!value) {
              return true;
            }
            const user = await User.findOne({
              where: {
                email: {
                  [Op.iLike]: `%${req.session?.userInfo?.email}%`,
                },
                status: true,
              },
            });
            const result = await bcrypt.compare(
              value,
              user.dataValues.password
            );
            if (result) {
              return true;
            }
            return false;
          }
        )
        .required("Mật khẩu cũ bắt buộc phải nhập"),
      passwordNew: string()
        .test(
          "validate-password",
          "Tối thiểu tám ký tự, ít nhất một chữ cái và một số:))",
          (value) => {
            const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            return pattern.test(value);
          }
        )
        .required("Mật khẩu mới bắt buộc phải nhập"),
      passwordNewRetype: string()
        .test(
          "validate-password",
          "Mật khẩu nhập lại không chính xác",
          (value) => {
            if (value === req.body.passwordNew) {
              return true;
            }
            return false;
          }
        )
        .required("Mật khẩu mới bắt buộc phải nhập lại"),
    };
    const body = await req.validate(req.body, rule);
    if (body) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(body.passwordNew, salt);
        const status = await User.update(
          {
            password: hashPassword,
          },
          {
            where: {
              email: {
                [Op.iLike]: `%${req.session?.userInfo?.email}%`,
              },
              status: true,
            },
          }
        );

        if (status) {
          let user = await User.findOne({
            where: {
              email: {
                [Op.iLike]: `%${req.session?.userInfo?.email}%`,
              },
              status: true,
            },
            include: {
              model: Device,
              as: "devices",
            },
          });
          user = user?.dataValues;
          const idList = user.devices.map((device) => device.id);
          for (let i = 0; i < idList.length; i++) {
            await Device.update(
              {
                status: false,
              },
              {
                where: {
                  id: idList[i],
                },
              }
            );
          }
          req.flash("msg", "Cập nhật thành công");
        }
      } catch (e) {
        next(e);
      }
    }
    return res.redirect("/account/change-password");
  },
  manageDevice: async (req, res, next) => {
    const msg = req.flash("msg");
    let user = await User.findOne({
      where: {
        email: {
          [Op.iLike]: `%${req.session?.userInfo?.email}%`,
        },
        status: true,
      },
      include: {
        model: Device,
        as: "devices",
      },
    });
    user = user.dataValues;
    res.render("account/device", {
      user,
      msg,
    });
  },
  logoutDevice: async (req, res, next) => {
    const { id } = req.params;

    try {
      await Device.update(
        {
          status: false,
        },
        {
          where: {
            id: id,
          },
        }
      );
    } catch (e) {
      next(e);
    }
    req.flash("msg", "Đăng xuất thành công");
    return res.redirect("/account/manage-device");
  },
};
