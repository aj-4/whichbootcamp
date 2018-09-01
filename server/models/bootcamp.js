'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bootcamp = sequelize.define('Bootcamp', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    camel: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    websiteURL: DataTypes.STRING,
    logoURL: DataTypes.STRING,
    miniLogoURL: DataTypes.STRING,
    locations: DataTypes.STRING,
    languages: DataTypes.STRING,
    programs: DataTypes.STRING,
    bcColor: DataTypes.STRING
  });

  Bootcamp.associate = (models) => {
    Bootcamp.hasMany(models.Program, {
      foreignKey: 'bootcampId',
      as: 'Programs',
    })
    Bootcamp.hasMany(models.Review, {
      foreignKey: 'bootcampId',
      as: 'Reviews',
    })
    Bootcamp.hasOne(models.BootcampAverageStats, {
      foreignKey: 'bootcampId',
      as: 'BootcampAverageStats'
    })
  };

  return Bootcamp;
};