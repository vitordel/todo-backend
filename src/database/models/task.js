const Sequelize = require('sequelize');
const sequelize = require('..');

const User = require('./User');

class Task extends Sequelize.Model {}

Task.init(
  {
    description: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    priority: {
      type: Sequelize.ENUM('Alta', 'Média', 'Baixa'),
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING(20),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'task',
    underscored: true,
  },
);

Task.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Task, { foreignKey: 'user_id' });

module.exports = Task;
