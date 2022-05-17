'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Games', [{
      gamename: 'Q-bert',
      gameid: 7,
      star: 2,
      review: "It's OK",
      username: 'GamerDude',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        gamename: "Battle Toad's",
        gameid: 8,
        star: 4,
        review: 'Kicks Ass!',
        username: 'Waffles69',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gamename: 'Virtual Fighter',
        gameid: 9,
        star: 5,
        review: 'Blocky Fun.',
        username: 'Bartman',
        createdAt: new Date(),
        updatedAt: new Date()
      }

  ], {});
    
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
