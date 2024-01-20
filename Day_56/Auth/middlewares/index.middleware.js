const { Op, where } = require("sequelize");
const { User } = require("../models/index");

module.exports = async (req, res, next) => {
  let user = await User.findOne({
    where: {
      email: {
        [Op.iLike]: `%${req.session?.userInfo?.email}%`,
      },
    },
  });
  user = user?.dataValues;
  if (
    req.session?.userInfo &&
    user.status &&
    (req.url === "/auth" || req.url === "/auth/login")
  ) {
    return res.redirect("/");
  }
  next();
};
