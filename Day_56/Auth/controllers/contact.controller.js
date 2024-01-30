const { string } = require("yup");
const path = require("path");
const sendMail = require("../utils/mail");
const { v4: uuidv4 } = require("uuid");
const { Op, where } = require("sequelize");
const { User, History } = require("../models/index");

module.exports = {
  index: async (req, res, next) => {
    const msg = req.flash("msg");
    res.render("contact/index", {
      req,
      msg,
    });
  },

  handleSend: async (req, res, next) => {
    const rule = {
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng"),
      subject: string().required("Subject bắt buộc phải nhập"),
      message: string().required("Message bắt buộc phải nhập"),
    };
    const body = await req.validate(req.body, rule);
    if (body) {
      const uuid = uuidv4();
      const info = await sendMail(
        req.session?.userInfo?.email,
        body.email,
        body.subject,
        body.message,
        uuid
      );
      if (info) {
        let user = await User.findOne({
          where: {
            email: {
              [Op.iLike]: `%${req.session?.userInfo?.email}%`,
            },
            status: true,
          },
        });
        user = user.dataValues;
        try {
          await History.create({
            uuid: uuid,
            email: body.email,
            subject: body.subject,
            content: body.message,
            user_id: user.id,
          });
        } catch (e) {
          next(e);
        }
        req.flash("msg", "Cập nhật thành công");
      }
    }
    return res.redirect("/contact");
  },
  histories: async (req, res, next) => {
    const msg = req.flash("msg");
    let user = await User.findOne({
      where: {
        email: {
          [Op.iLike]: `%${req.session?.userInfo?.email}%`,
        },
        status: true,
      },
      include: {
        model: History,
        as: "histories",
      },
    });
    user = user.dataValues;
    res.render("contact/histories", {
      user,
      msg,
    });
  },
  historiesDetail: async (req, res, next) => {
    const { uuid } = req.params;
    try {
      const email = await History.findOne({
        where: {
          uuid: {
            [Op.iLike]: `%${uuid}%`,
          },
        },
      });
      res.render("contact/detail", {
        email,
      });
    } catch (e) {
      next(e);
    }
  },
  deleteEmail: async (req, res, next) => {
    const { uuid } = req.params;
    try {
      const email = await History.destroy({
        where: {
          uuid: {
            [Op.iLike]: `%${uuid}%`,
          },
        },
      });
      if (email) {
        req.flash("msg", "Xóa thành công");
        return res.redirect("/contact/histories");
      }
    } catch (e) {
      next(e);
    }
  },
};
