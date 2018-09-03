'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    feedback: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    feedbackType: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  }, {});
  Feedback.associate = function(models) {
    // associations can be defined here
  };
  return Feedback;
};