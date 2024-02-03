"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "levi2k3ds@gmail.com",
    pass: "yere wwei eqaj hves",
  },
});

module.exports = async (to, subject, message) => {
  const info = await transporter.sendMail({
    from: `"F88 Nha Cai Top 1 Chau Au 👻" <levi2k3ds@gmail.com>`, // sender address
    to, // list of receivers
    subject: subject, // Subject line
    html: `
    ${message}
    `, // html body
  });
  return info;
};
