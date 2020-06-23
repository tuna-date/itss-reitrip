'use strict';

let seedRates = [];

for (let i = 0; i < 100; i++) {
  seedRates.push({
    user_id: Math.floor(Math.random()*100 + 1),
    place_id: Math.floor(Math.random()*50 + 1),
    rate_score: Math.floor(Math.random()*5 + 1),
    created_at: new Date(),
    updated_at: new Date(),
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('rates', seedRates);
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
