// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('node_crud', 'root', '', {
//   host: 'localhost',
//   dialect: 'mariadb',
//   dialectOptions: {
//     timezone: 'Etc/GMT0'
//   }
// })

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_crud', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


module.exports = sequelize;
