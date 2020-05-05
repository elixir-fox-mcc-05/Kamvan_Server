'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize;
  class Task extends Model { };

  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title is required.'
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['back-log', 'todo', 'ongoing', 'completed']
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate: (task) => {
        task.status = 'back-log'
      }
    }
  })


  Task.associate = function (models) {
    Task.belongsTo(models.User)
  };
  return Task;
};