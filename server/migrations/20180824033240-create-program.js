'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Programs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      camel: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cost: {
        type: Sequelize.INTEGER
      },
      details: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      otherDetails: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Programs');
  }
};