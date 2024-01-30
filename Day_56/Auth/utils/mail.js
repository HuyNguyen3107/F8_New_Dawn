"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "levi2k3ds@gmail.com",
    pass: "lzob tqlv paut rqut",
  },
});

module.exports = async (from, to, subject, message, uuid) => {
  const info = await transporter.sendMail({
    from: `"F88 Nha Cai Top 1 Chau Au 👻" <${from}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    html: `
    <img src="https://email-management-three.vercel.app/check-mail?uuid=${uuid}&email=${to}" style="width:100px; height:100px">
    <br />
    ${message}
    `, // html body
  });
  return info;
};
