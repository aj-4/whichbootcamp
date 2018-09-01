'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    goodInstructors: DataTypes.BOOLEAN,
    jobSpeed: DataTypes.BOOLEAN,
    worthTheMoney: DataTypes.BOOLEAN,
    wouldAttendAgain: DataTypes.BOOLEAN,
    futureOutlook: DataTypes.BOOLEAN,
    average: DataTypes.BOOLEAN
  });

  Review.associate = function(models) {
    Review.belongsTo(models.Bootcamp, {
      foreignKey: 'bootcampId',
    })
  };
  return Review;
};