const { User, Device } = require("../models/index");
const { Op, where } = require("sequelize");
module.exports = {
  findOne: async (where, includes, attributes) => {
    const conditions = {};
    conditions.where = where;
    if (includes) {
      conditions.include = includes;
    }
    if (attributes) {
      conditions.attributes = attributes;
    }
    const user = await User.findOne(conditions);
    return user;
  },
  findByPk: async (id, options) => {
    let user;
    if (options) {
      user = await User.findByPk(id, options);
    } else {
      user = await User.findByPk(id);
    }
    return user;
  },
  add: async (name, email, password, provider_id) => {
    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
      status: "active",
      provider_id: provider_id,
    });
    return newUser;
  },
  update: async (fields, where) => {
    return await User.update(fields, {
      where: where,
    });
  },
  delete: async (where) => {
    return await User.destroy({ where: where });
  },
  findAndCountAll: async (options) => {
    return await User.findAndCountAll(options);
  },
};
