const { Op, where } = require("sequelize");
const { User, Device } = require("../models/index");

module.exports = {
  index: (req, res, next) => {
    const successMsg = req.flash("successMsg");
    res.render("index", {
      req,
      successMsg,
    });
  },
  logout: async (req, res) => {
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
    await User.update(
      {
        status: false,
      },
      {
        where: {
          email: {
            [Op.iLike]: `%${req.session?.userInfo?.email}%`,
          },
        },
      }
    );
    user = user?.dataValues;
    const device = user?.devices?.find((device) => {
      return device.user_agent === req.get("user-agent");
    });
    try {
      await Device.update(
        {
          status: false,
        },
        {
          where: {
            id: device.id,
            user_agent: req.get("user-agent"),
          },
        }
      );
    } catch (e) {
      next(e);
    }
    delete req.session.userInfo;
    req.flash("successMsg", "Đăng xuất thành công");
    return res.redirect("/auth/login");
  },
};
