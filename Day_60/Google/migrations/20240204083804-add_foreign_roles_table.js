"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("users_roles", {
      name: "users_roles_role_id_foreign",
      type: "foreign key",
      fields: ["role_id"],
      references: {
        table: "roles",
        field: "id",
      },
    });

    await queryInterface.addConstraint("roles_permissions", {
      name: "roles_permissions_role_id_foreign",
      type: "foreign key",
      fields: ["role_id"],
      references: {
        table: "roles",
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
