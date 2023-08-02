const { Sequelize, DataTypes } = require('sequelize')
const AdminModel = require('../models/admin')
const UserModel = require('../models/user')
  
const sequelize = new Sequelize('together', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})


const Admin = AdminModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
// instance user auprès de sequelize
  
module.exports = { 
  Admin, User
}
// export de la fonction initDB qui permet d'initialiser la bdd et model sequelize Pokemon pour s'en servir ailleurs dans le code.




