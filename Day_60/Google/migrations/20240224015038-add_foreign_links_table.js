"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("links", {
      name: "links_user_id_foreign",
      type: "foreign key",
      fields: ["user_id"],
      references: {
        table: "users",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("links", "links_user_id_foreign");
  },
};
