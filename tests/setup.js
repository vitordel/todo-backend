const sequelize = require('../src/database/index');

afterAll(async () => {
  await sequelize.close();
});
