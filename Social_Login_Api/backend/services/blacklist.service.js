const { BlacklistToken } = require("../models/index");
const { Op, where } = require("sequelize");
module.exports = {
  findOne: async (accessToken) => {
    const token = await BlacklistToken.findOne({
      where: { token: accessToken ?? "" },
    });
    return token;
  },
  add: async (accessToken) => {
    const token = await BlacklistToken.create({
      token: accessToken,
    });
    return token;
  },
  update: async () => {},
  delete: () => {},
  findOrCreate: async (where, defaults) => {
    const [blacklist] = await BlacklistToken.findOrCreate({
      where: where,
      defaults: defaults,
    });
    return blacklist;
  },
};
