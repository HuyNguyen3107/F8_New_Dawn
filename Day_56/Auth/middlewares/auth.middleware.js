const { Op, where } = require("sequelize");
const { User } = require("../models/index");

module.exports = async (req, res, next) => {
  if (!req.session?.userInfo) {
    return res.redirect("/auth/login");
  } else {
    let user = await User.findOne({
      where: {
        email: {
          [Op.iLike]: `%${req.session?.userInfo?.email}%`,
        },
      },
    });
    user = user?.dataValues;
    if (!user.status) {
      return res.redirect("/auth/login");
    }
  }
  next();
};
