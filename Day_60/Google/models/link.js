"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Link.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Link.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shortened_link: {
        type: DataTypes.STRING,
      },
      original_link: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      access_times: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      save_redirect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Link",
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "links",
    }
  );
  return Link;
};
