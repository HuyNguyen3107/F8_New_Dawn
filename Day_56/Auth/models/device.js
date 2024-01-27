"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Device.belongsToMany(models.User, {
        foreignKey: "device_id",
        through: "users_devices",
        as: "users",
      });
    }
  }
  Device.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      browser: DataTypes.STRING,
      operating_system: DataTypes.STRING,
      device_type: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      user_agent: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Device",
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "devices",
    }
  );
  return Device;
};
