'use strict';
module.exports = (sequelize, DataTypes) => {
  const BootcampAverageStats = sequelize.define('BootcampAverageStats', {
    overall: DataTypes.FLOAT,
    goodInstructors: DataTypes.FLOAT,
    jobSpeed: DataTypes.FLOAT,
    worthTheMoney: DataTypes.FLOAT,
    wouldAttendAgain: DataTypes.FLOAT,
    futureOutlook: DataTypes.FLOAT
  }, {});
  BootcampAverageStats.associate = function(models) {
    BootcampAverageStats.belongsTo(models.Bootcamp, {
      foreignKey: 'bootcampId',
    })
  };
  return BootcampAverageStats;
};