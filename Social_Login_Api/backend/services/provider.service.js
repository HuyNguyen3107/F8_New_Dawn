const { Provider } = require("../models/index");
const { Op, where } = require("sequelize");
module.exports = {
  findOne: async (value) => {
    const provider = await Provider.findOne({
      where: {
        name: {
          [Op.iLike]: `%${value}%`,
        },
      },
    });
    return provider;
  },
  add: async (nameProvider) => {
    const newProvider = await Provider.create({
      name: nameProvider,
    });
    return newProvider;
  },
  update: () => {},
  delete: () => {},
};
