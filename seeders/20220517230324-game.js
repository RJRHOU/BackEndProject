'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('gameInfo', [{
      name: 'Bulbasaur',
      hp: 50,
      type: 'grass',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      name: 'Charmander',
      hp: 40,
      type: 'fire',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Squirtle',
      hp: 50,
      type: 'water', 
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
