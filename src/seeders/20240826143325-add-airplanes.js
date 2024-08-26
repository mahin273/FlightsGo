'use strict';
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
    await queryInterface.bulkInsert('Airplanes', [
      {
        modelNumber: 'Airbus380',
        capacity: 450,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'Boeing 737',
        capacity: 390,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Airplanes', {
      [Op.or]: [
        { modelNumber: 'Airbus380' },
        { modelNumber: 'Boeing 737' }
      ]
    })
  }
};
