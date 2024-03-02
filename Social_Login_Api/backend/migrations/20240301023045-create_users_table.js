"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(200),
      },
      thumbnail: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.STRING(100),
      },
      provider_id: {
        type: Sequelize.INTEGER,
      },
      access_token: {
        type: Sequelize.STRING(200),
      },
      reset_token: {
        type: Sequelize.STRING(200),
      },
      expired_token: {
        type: Sequelize.STRING(200),
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
