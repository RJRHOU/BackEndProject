'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Games', [{
      gamename: 'Pac-Man',
      gameid: 1,
      star: 5,
      review: 'Still a classic!',
      username: 'GamerDude',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        gamename: 'Sonic the Hedgehog',
        gameid: 2,
        star: 4,
        review: 'Weeeeee!',
        username: 'Waffles69',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gamename: 'Mortal Combat',
        gameid: 3,
        star: 3,
        review: 'The Super Nintedo blood is GREEN.....',
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
