const LocalStrategy = require("passport-local").Strategy;
const { where } = require("sequelize");
const { User } = require("../models/index");
const bcrypt = require("bcrypt");

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return done(null, false, {
        message: "Account not exist",
      });
    }
    const result = bcrypt.compareSync(password, user.password);
    if (!result) {
      return done(null, false, {
        message: "Password incorrect",
      });
    }
    return done(null, user);
  }
);
