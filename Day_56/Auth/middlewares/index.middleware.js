const { Op, where } = require("sequelize");
const { User, Device } = require("../models/index");

module.exports = async (req, res, next) => {
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
  if (
    req.session?.userInfo &&
    user.status &&
    device?.status &&
    (req.url === "/auth" || req.url === "/auth/login")
  ) {
    return res.redirect("/");
  }
  next();
};
