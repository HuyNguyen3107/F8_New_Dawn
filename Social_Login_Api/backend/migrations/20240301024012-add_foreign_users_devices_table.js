"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("users_devices", {
      name: "users_devices_user_id_foreign",
      type: "foreign key",
      fields: ["user_id"],
      references: {
        table: "users",
        field: "id",
      },
    });

    await queryInterface.addConstraint("users_devices", {
      name: "users_devices_device_id_foreign",
      type: "foreign key",
      fields: ["device_id"],
      references: {
        table: "devices",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "users_devices",
      "users_devices_user_id_foreign"
    );
    await queryInterface.removeConstraint(
      "users_devices",
      "users_devices_device_id_foreign"
    );
  },
};
