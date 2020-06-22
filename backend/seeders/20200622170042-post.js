'use strict';
const faker=require('faker');

let seedPosts = [];

for (let i = 0; i < 200; i++) {
  seedPosts.push({
    user_id: Math.floor(Math.random()*100 + 1),
    place_id: Math.floor(Math.random()*50 + 1),
    content: faker.lorem.paragraph(),
    created_at: new Date(),
    updated_at: new Date(),
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('posts', seedPosts);
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
