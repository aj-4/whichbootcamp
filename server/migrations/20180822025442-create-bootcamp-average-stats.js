'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BootcampAverageStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      overall: {
        type: Sequelize.FLOAT
      },
      goodInstructors: {
        type: Sequelize.FLOAT
      },
      jobSpeed: {
        type: Sequelize.FLOAT
      },
      worthTheMoney: {
        type: Sequelize.FLOAT
      },
      wouldAttendAgain: {
        type: Sequelize.FLOAT
      },
      futureOutlook: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BootcampAverageStats');
  }
};