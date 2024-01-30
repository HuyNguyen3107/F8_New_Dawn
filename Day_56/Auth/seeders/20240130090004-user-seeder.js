"use strict";

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];
    const salt = await bcrypt.genSalt(10);
    for (let i = 1; i <= 10; i++) {
      const hashPassword = await bcrypt.hash(faker.internet.password(), salt);
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: hashPassword,
        status: false,
        created_at: faker.date.past(),
        updated_at: faker.date.past(),
      };
      data.push(user);
    }
    await queryInterface.bulkInsert("users", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users");
  },
};
