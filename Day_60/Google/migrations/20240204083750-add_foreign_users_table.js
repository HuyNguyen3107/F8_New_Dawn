"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("users_roles", {
      name: "users_roles_user_id_foreign",
      type: "foreign key",
      fields: ["user_id"],
      references: {
        table: "users",
        field: "id",
      },
    });

    await queryInterface.addConstraint("users_permissions", {
      name: "users_permissions_user_id_foreign",
      type: "foreign key",
      fields: ["user_id"],
      references: {
        table: "users",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "users_roles",
      "users_roles_user_id_foreign"
    );
    await queryInterface.removeConstraint(
      "users_permissions",
      "users_permissions_user_id_foreign"
    );
  },
};
