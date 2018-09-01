'use strict';
module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define('Program', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    camel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: DataTypes.INTEGER,
    details: DataTypes.STRING,
    duration: DataTypes.STRING,
    otherDetails: DataTypes.STRING
  }, {});
  Program.associate = function(models) {
    Program.belongsTo(models.Bootcamp, {
      foreignKey: 'bootcampId',
    })
  };
  return Program;
};