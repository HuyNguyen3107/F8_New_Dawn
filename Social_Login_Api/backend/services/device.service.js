const { Device } = require("../models/index");
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
    const device = await Device.findOne(conditions);
    return device;
  },
  add: async (browser, operating_system, device_type, status, user_agent) => {
    const device = await Device.create({
      browser: browser,
      operating_system: operating_system,
      device_type: device_type,
      status: status,
      user_agent: user_agent,
    });
    return device;
  },
  update: async (fields, where) => {
    return await Device.update(fields, {
      where: where,
    });
  },
  delete: () => {},
};
