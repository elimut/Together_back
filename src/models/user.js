const Role  = require('./role');
// const { sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le nom ne peut pas être vide."},
        notNull: {msg: "Le nom est une propriété requise."}
      }
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le prénom ne peut pas être vide."},
        notNull: {msg: "Le prénom est une propriété requise."}
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
          msg: 'Le mail est déjà utilisé.'
      },
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le mail ne peut pas être vide."},
        notNull: {msg: "Le mail est une propriété requise."}
      }
    },
    nom_utilisateur: {
      type: DataTypes.STRING,
      unique: {
        msg: `Le nom d'utilisateur est déjà pris.`
      },
      unique: {
        msg: `Le nom d'utilisateur est déjà pris.`
      },
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le nom d'utilisateur ne peut pas être vide."},
        notNull: {msg: "Le nom d'utilisateur est une propriété requise."},
        // is: {/^\w{3,}$/}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },{
      timestamps: true,
      createdAt: 'created',
      updatedAt: 'created'
    }
  );
    User.associate = (models) => {
      User.belongsTo(models.Role, {
        as: 'role_id'});
        Role.hasOne(User);
      
    }
  
  return User;
};
  // User.belongsTo(Role, {
  //   foreignKey: 'role_id',
  //   targetKey: 'id'
  // });
  // User.belongsTo(Role, {
  //   foreignKey: 'role_id',
  //   targetKey: 'id'
  // });
 

  



// validate: {
//   // We require usernames to have length of at least 3, and
//   // only use letters, numbers and underscores.
//   is: /^\w{3,}$/
// }