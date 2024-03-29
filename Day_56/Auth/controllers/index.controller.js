const { Op, where } = require("sequelize");
const { User, Device, History } = require("../models/index");
const path = require("path");
const sendMail = require("../utils/mail");

module.exports = {
  index: async (req, res, next) => {
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
    const device = user?.devices?.find((device) => {
      return device.user_agent === req.get("user-agent");
    });
    try {
      await Device.update(
        {
          browser: device.browser,
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
  checkMail: async (req, res, next) => {
    const infoEmail = req.query;
    await History.update(
      {
        status: true,
      },
      {
        where: {
          uuid: {
            [Op.iLike]: `%${infoEmail.uuid}%`,
          },
          email: {
            [Op.iLike]: `%${infoEmail.email}%`,
          },
        },
      }
    );
    const options = {
      root: path.join(__dirname) + "/../public/images",
    };

    const fileName = "f8.jpg";
    res.set("Content-type", "image/jpg");
    res.sendFile(fileName, options, function (err) {
      if (err) {
        console.error("Error sending file:", err);
      } else {
        console.log("Sent:", fileName);
      }
    });
  },
};
