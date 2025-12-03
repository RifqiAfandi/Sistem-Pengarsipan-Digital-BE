'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const extistingUsers = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (extistingUsers.length > 0) {
      console.log('Users already exist, skipping seeding demo users.');
      return;
    }
    
    const hashedPassword = bcrypt.hashSync('admin123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        nama: 'Admin',
        username: 'admin',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
