'use strict';

const { encrypt } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize;
  class User extends Model { }

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please input valid email address.'
        }
      },
      unique: {
        args: true,
        msg: 'Email already registered!'
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8],
          msg: 'Password must be 8 characters or more.'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = encrypt(user.password)
      }
    },
    sequelize
  })

  User.associate = function (models) {
    User.hasMany(models.Task)
  };
  return User;
};