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
        notNull: {msg: "Le nom d'utilisateur est une propriété requise."}
      }
    },
    password: {
      type: DataTypes.STRING
    },
    // role_id: {
    //   type: DataTypes.INTEGER
    // }
  },{
      timestamps: true,
      createdAt: 'created',
      updatedAt: 'created'
    }
  );
  User.belongsTo(Role);
  return User;
}
