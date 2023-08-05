const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/user');
const RoleModel = require('../models/role');
  
const sequelize = new Sequelize('together', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
});

sequelize.authenticate().then(() => {
  console.log('Connection ok');
}).catch((error) => {
  console.log('connection enable', error);
});

const User = UserModel(sequelize, DataTypes);
const Role = RoleModel(sequelize, DataTypes);
// instance user auprès de sequelize
  
module.exports = { 
  User, Role
}
// export de la fonction initDB qui permet d'initialiser la bdd et model sequelize Pokemon pour s'en servir ailleurs dans le code.




