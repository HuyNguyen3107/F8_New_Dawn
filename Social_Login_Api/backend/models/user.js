"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Provider, {
        foreignKey: "provider_id",
        as: "provider",
      });
      User.belongsToMany(models.Device, {
        foreignKey: "user_id",
        through: "users_devices",
        as: "devices",
      });
      User.hasMany(models.UserToken, {
        foreignKey: "user_id",
        as: "user_tokens",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      thumbnail: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.STRING,
      },
      provider_id: {
        type: DataTypes.INTEGER,
      },
      access_token: {
        type: DataTypes.STRING,
      },
      reset_token: {
        type: DataTypes.STRING,
      },
      expired_token: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "users",
    }
  );
  return User;
};
