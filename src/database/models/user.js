const Sequelize = require('sequelize');
const sequelize = require('..');

class User extends Sequelize.Model {}

User.init(
  {
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    temptoken: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'user',
    underscored: true,
  },
);

module.exports = User;
