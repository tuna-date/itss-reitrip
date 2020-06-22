'use strict';
const faker=require('faker');

let seedUsers = [];

for (let i = 0; i < 100; i++) {
  seedUsers.push({
    email: `user+${i}@gmail.com`,
    username: faker.name.firstName(),
    password: '123456',
    created_at: new Date(),
    updated_at: new Date(),
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', seedUsers);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
