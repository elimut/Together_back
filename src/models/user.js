module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
      // export  fonction de deux param: sequelize = objet représente la co à la bdd pour Sequelize, cet objet possède une propriété define qui permet de déclarer un nouveau models auprès de sequelize et datatypes = définit les types de données de chaque propriétés du models ex: name => string
      // return => retourne directement résultat méthode define. define retourne le nouveau models déclaré auprès de Sequelize, il pourra être utilisé ailleurs grâce à l'export.
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
      // unicité de chaque objet, onn va pouvoir retirer getUniqueId de helper cqar c'est le rôle de la bdd de garantir l'unicité de l'id
    },
      //   la propriété define prend elle même 3 param, afin de mettre en place un nouveau models. Sequelize se base sur les models que nous déclarons pour construire les tables dans la bdd sql par la suite.
      // param: nom du models création de la table Pokemon (l2),avec un s par la suite. Puis, description du models, on décrit toutes les prop du modèle qui seront traduit en colonne dans la table. Pour chaque prop: un nom, un objt de config pour param le titre et le caracr obligatoire ou non de la prop. Le 3 ème param = est une option de param global. Facultatif pêrmet d'ajouter une config plus globale à notre model. Sequelize génère deux prop par défaut indépendamment des champs renseignés => createdAt date créa nouveau modèle et updatedAt date de modif d'une instance, mais l'on peut les modifier.
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le nom ne peut pas être vide."},
        notNull: {msg: "Le nom est une propriété requise."}
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      // facultatif ou non?
      validate: {
        notEmpty: { msg: "Le prénom ne peut pas être vide."},
        notNull: {msg: "Le prénom est une propriété requise."}
      }
    },
    email: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Le mail est une propriété requise."}
      }
    }
  }, {
      timestamps: true,
    // indique que nous souhaitons modifier le cpmt par défaut
      createdAt: 'created',
      updatedAt: false
    //   option de param global
    })
}