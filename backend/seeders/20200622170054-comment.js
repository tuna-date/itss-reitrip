'use strict';
const faker=require('faker');

let seedComments = [];

for (let i = 0; i < 500; i++) {
  seedComments.push({
    user_id: Math.floor(Math.random()*100 + 1),
    post_id: Math.floor(Math.random()*200 + 1),
    content: faker.lorem.sentence(),
    created_at: new Date(),
    updated_at: new Date(),
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('comments', seedComments);
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
