const { Link, User } = require("../models/index");
const getShortLink = require("../utils/getShortLink");
const validateId = require("../utils/validateId");
const bcrypt = require("bcrypt");
const { Op, where } = require("sequelize");

module.exports = {
  index: async (req, res) => {
    const errorMsg = req.flash("errorMsg");
    const successMsg = req.flash("successMsg");
    const shortened = req.flash("shortened");
    const change_id = req.flash("change_id");
    const shortened_link = req.flash("shortened_link");
    res.render("links/index", {
      req,
      errorMsg,
      successMsg,
      shortened,
      change_id,
      shortened_link,
    });
  },
  handleShorten: async (req, res) => {
    const { link, password, save_redirect, change_id, shorten_url } = req.body;
    if (!shorten_url) {
      if (!link) {
        req.flash("errorMsg", "Vui lòng nhập liên kết cần rút gọn");
      } else if (link.slice(0, 5) !== "https") {
        req.flash("errorMsg", "Vui lòng nhập liên kết hợp lệ");
      } else {
        const data = {};
        data.original_link = link;
        const shortened_link = await getShortLink();
        data.shortened_link = shortened_link;
        if (password) {
          if (password.length > 16) {
            data = {};
            req.flash("errorMsg", "Mật khẩu có tối đa 16 ký tự");
            return res.redirect("/links");
          }
          data.password = password;
        }
        data.user_id = req.user.id;
        if (save_redirect) {
          data.save_redirect = true;
        }
        const newLink = await Link.create({
          ...data,
        });
        req.flash("shortened", "true");
        req.flash("change_id", change_id);
        req.flash("shortened_link", shortened_link);
        req.flash("linkId", newLink.id);
        req.flash("successMsg", "Rút gọn liên kết thành công");
      }
    } else {
      const linkId = req.flash("linkId");
      if (
        shorten_url.slice(0, 44) !==
        "https://google-seven-gamma.vercel.app/short/"
      ) {
        req.flash("shortened", "true");
        req.flash("change_id", "true");
        req.flash("shortened_link", shorten_url);
        req.flash("linkId", linkId[0]);
        req.flash("errorMsg", "Vui lòng nhập liên kết hợp lệ");
      } else {
        const shortenId = shorten_url.slice(44);
        if (validateId(shortenId) === true) {
          const linkExist = await Link.findOne({
            where: {
              shortened_link: {
                [Op.iLike]: `%https://google-seven-gamma.vercel.app/short/${shortenId}%`,
              },
            },
          });
          if (linkExist) {
            req.flash("shortened", "true");
            req.flash("change_id", "true");
            req.flash(
              "shortened_link",
              `https://google-seven-gamma.vercel.app/short/${shortenId}`
            );
            req.flash("linkId", linkId[0]);
            req.flash("errorMsg", "Id đã tồn tại");
          } else {
            const new_shortened_link = `https://google-seven-gamma.vercel.app/short/${shortenId}`;
            await Link.update(
              {
                shortened_link: new_shortened_link,
              },
              {
                where: {
                  id: linkId[0],
                },
              }
            );
            req.flash("shortened", "true");
            req.flash("change_id", "true");
            req.flash("shortened_link", new_shortened_link);
            req.flash("linkId", linkId[0]);
            req.flash("successMsg", "Cập nhật liên kết thành công");
          }
        } else {
          req.flash("shortened", "true");
          req.flash("change_id", "true");
          req.flash("shortened_link", shorten_url);
          req.flash("linkId", linkId[0]);
          req.flash("errorMsg", validateId(shortenId));
        }
      }
    }
    return res.redirect("/links");
  },
  manage: async (req, res) => {
    const id = req.user.id;
    const user = await User.findByPk(id, {
      include: [
        {
          model: Link,
          as: "links",
        },
      ],
    });
    const links = user.links;
    const successMsg = req.flash("successMsg");
    res.render("links/manage", {
      req,
      links,
      successMsg,
    });
  },
  password: async (req, res) => {
    const { id } = req.params;
    const link = await Link.findOne({
      where: {
        id,
      },
    });
    res.render("links/password", {
      req,
      link,
    });
  },
  edit: async (req, res) => {
    const { id } = req.params;
    const errorMsg = req.flash("errorMsg");
    const successMsg = req.flash("successMsg");
    const link = await Link.findOne({
      where: {
        id,
      },
    });
    res.render("links/edit", {
      req,
      link,
      successMsg,
      errorMsg,
    });
  },
  handleEdit: async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    if (password) {
      if (password.length > 16) {
        req.flash("errorMsg", "Mật khẩu có tối đa 16 ký tự");
      } else {
        await Link.update(
          {
            password: password,
          },
          {
            where: {
              id,
            },
          }
        );
        req.flash("successMsg", "Cập nhật thành công");
      }
    } else {
      await Link.update(
        {
          password: null,
        },
        {
          where: {
            id,
          },
        }
      );
      req.flash("successMsg", "Cập nhật thành công");
    }
    return res.redirect("/links/manage/edit/" + id);
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    try {
      const link = await Link.destroy({
        where: {
          id,
        },
      });
      if (link) {
        req.flash("successMsg", "Xóa thành công");
        return res.redirect("/links/manage");
      }
    } catch (e) {
      next(e);
    }
  },
};
