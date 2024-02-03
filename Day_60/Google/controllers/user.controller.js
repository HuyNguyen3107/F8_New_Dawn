const { User } = require("../models/index");
const { where, json } = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
  index: async function (req, res, next) {
    res.send("Hello");
  },
};
