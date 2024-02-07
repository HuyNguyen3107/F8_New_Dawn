"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permission.belongsToMany(models.Role, {
        foreignKey: "permission_id",
        through: "roles_permissions",
        as: "roles",
      });
      Permission.belongsToMany(models.User, {
        foreignKey: "permission_id",
        through: "users_permissions",
        as: "users",
      });
    }
  }
  Permission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Permission",
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "permissions",
    }
  );
  return Permission;
};
