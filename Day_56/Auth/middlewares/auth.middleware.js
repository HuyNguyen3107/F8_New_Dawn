const { Op, where } = require("sequelize");
const { User, Device } = require("../models/index");

module.exports = async (req, res, next) => {
  if (req.url.includes("/check-mail")) {
    return next();
  }
  if (!req.session?.userInfo) {
    return res.redirect("/auth/login");
  } else {
    let user = await User.findOne({
      where: {
        email: {
          [Op.iLike]: `%${req.session?.userInfo?.email}%`,
        },
      },
      include: {
        model: Device,
        as: "devices",
      },
    });
    user = user?.dataValues;
    const device = user?.devices?.find((device) => {
      return device.user_agent === req.get("user-agent");
    });
    if (!user.status || !device?.status) {
      return res.redirect("/auth/login");
    }
  }
  next();
};
