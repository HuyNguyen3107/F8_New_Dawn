const { Link } = require("../models/index");
const { Op, where } = require("sequelize");

module.exports = {
  logout: (req, res) => {
    req.logout((error) => {
      if (!error) {
        return res.redirect("/auth/login");
      }
    });
  },
  redirect: async (req, res) => {
    const { id } = req.params;
    const link = await Link.findOne({
      where: {
        shortened_link: {
          [Op.iLike]: `%https://google-seven-gamma.vercel.app/short/${id}%`,
        },
      },
    });
    let count = +link.access_times + 1;
    await Link.update(
      {
        access_times: count,
      },
      {
        where: {
          id: link.id,
        },
      }
    );
    if (link.save_redirect === true) {
      if (link.password) {
        return res.redirect("/check-password/" + link.id);
      } else {
        req.flash("original_link", link.original_link);
        return res.redirect("/save-redirect");
      }
    } else {
      return res.redirect(`${link.original_link}`);
    }
  },
  saveRedirect: async (req, res) => {
    const original_link = req.flash("original_link");
    res.render("redirect/save", {
      req,
      original_link,
      layout: "auth/layout",
    });
  },
  checkPassword: (req, res) => {
    const errorMsg = req.flash("errorMsg");
    res.render("redirect/index", {
      req,
      errorMsg,
      layout: "auth/layout",
    });
  },
  handleCheckPassword: async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    const link = await Link.findOne({
      where: {
        id,
      },
    });
    if (link.password === password) {
      req.flash("original_link", link.original_link);
      return res.redirect("/save-redirect");
    } else {
      req.flash("errorMsg", "Mật khẩu không chính xác");
      return res.redirect("/check-password/" + link.id);
    }
  },
};
