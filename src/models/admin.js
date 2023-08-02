module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Admin', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: {
          msg: 'Le nom est déjà pris.'
      }
      // vérif unicité id de l'user
    },
    password: {
      type: DataTypes.STRING
    }
  },{
      timestamps: true,
    // indique que nous souhaitons modifier le cpmt par défaut
      createdAt: 'created',
      updatedAt: false
    //   option de param global
  })
}