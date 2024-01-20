const { Op, where } = require("sequelize");
const { User } = require("../models/index");

module.exports = {
  index: (req, res, next) => {
    const successMsg = req.flash("successMsg");
    res.render("index", {
      req,
      successMsg,
    });
  },
  logout: async (req, res) => {
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
    delete req.session.userInfo;
    req.flash("successMsg", "Đăng xuất thành công");
    return res.redirect("/auth/login");
  },
};
