'use strict';

let seedUpvotes = [];

for (let i = 0; i < 500; i++) {
  seedUpvotes.push({
    user_id: Math.floor(Math.random()*100 + 1),
    post_id: Math.floor(Math.random()*200 + 1),
    created_at: new Date(),
    updated_at: new Date(),
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('upvotes', seedUpvotes);
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
