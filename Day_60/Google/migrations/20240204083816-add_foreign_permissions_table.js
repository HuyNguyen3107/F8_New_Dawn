"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("users_permissions", {
      name: "users_permissions_permission_id_foreign",
      type: "foreign key",
      fields: ["permission_id"],
      references: {
        table: "permissions",
        field: "id",
      },
    });

    await queryInterface.addConstraint("roles_permissions", {
      name: "roles_permissions_permission_id_foreign",
      type: "foreign key",
      fields: ["permission_id"],
      references: {
        table: "permissions",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
