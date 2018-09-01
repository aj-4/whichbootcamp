'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Bootcamps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      camel: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      websiteURL: Sequelize.STRING,
      logoURL: Sequelize.STRING,
      miniLogoURL: Sequelize.STRING,
      locations: Sequelize.STRING,
      languages: Sequelize.STRING,
      programs: Sequelize.STRING,
      bcColor: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Bootcamps')
};
