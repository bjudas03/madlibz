'use strict';
module.exports = (sequelize, DataTypes) => {
  var usersMadlibs = sequelize.define('usersMadlibs', {
    userId: DataTypes.INTEGER,
    madlibId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersMadlibs;
};