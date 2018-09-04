'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
  queryInterface.createTable('Reviews', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    goodInstructors: Sequelize.BOOLEAN,
    jobSpeed: Sequelize.BOOLEAN,
    worthTheMoney: Sequelize.BOOLEAN,
    wouldAttendAgain: Sequelize.BOOLEAN,
    futureOutlook: Sequelize.BOOLEAN,
    average: Sequelize.BOOLEAN,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    bootcampName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    bootcampId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Bootcamps',
        key: 'id',
        as: 'bootcampId',
      },
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Reviews')
};
