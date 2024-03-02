const { UserToken } = require("../models/index");
const { Op, where } = require("sequelize");
module.exports = {
  findOne: async (where) => {
    const conditions = {};
    conditions.where = where;
    const userToken = await UserToken.findOne(conditions);
    return userToken;
  },
  add: async (refresh_token, user_id) => {
    const newToken = await UserToken.create({
      refresh_token,
      user_id,
    });
    return newToken;
  },
  update: () => {},
  delete: () => {},
};
