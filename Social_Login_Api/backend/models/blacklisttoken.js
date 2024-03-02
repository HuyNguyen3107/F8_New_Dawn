"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BlacklistToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BlacklistToken.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.STRING,
      },
      expired: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "BlacklistToken",
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "blacklist_token",
    }
  );
  return BlacklistToken;
};
