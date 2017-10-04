'use strict';
module.exports = (sequelize, DataTypes) => {
  var madlib = sequelize.define('madlib', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        models.madlib.belongsToMany(models.user, {through: "usersMadlibs"})
        // associations can be defined here
      }
    }
  });
  return madlib;
};