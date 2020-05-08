'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descriptions: {
        type: Sequelize.STRING
      },
      point: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      assigned: {
        allowNull: false,
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        references : {
          model : "Users",
          key : "id"
        },
        onDelete : "cascade",
        onUpdate : "cascade"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};