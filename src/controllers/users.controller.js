const { User, Role } = require('../DB/sequelize');
// const { Role } = require('../../DB/sequelize');
// const auth = require("../auth/auth");

// requête get user by id (voir pour récup admin)
exports.findUser  = async (req, res) => {
  const id = req.params.id;
    const user = await User.findByPk(id
    //   , {
    //   include: [
    //     {
    //       model: Role,
    //       attributes: ['role_id'], // Vous pouvez spécifier les attributs de la table Role que vous voulez inclure
    //     },
    //   ]
    // }
    )
      // pas de parseInt car findByPk le fait d'elle même
       .then(user => {
            if(user === null) {
            // findByPk de Sequelize, qui retourne null si aucun résultat n’a été trouvé en base de données, pour l’identifiant fournit en paramètre.
            const message = `L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant.`;
            return res.status(404).json({ message });
            // API Rest fonctionnera correctement du point de vue du client, car vous lui fournirez bien la réponse demandée, mais vous introduisiez dans votre code des effets de bord peu désirables car voir res.json js continue de s'exécuter l15. return => interruption du traitement en cours
            }
        const message = `Un utilisateur a bien été trouvé.`;
        res.json({ message, id: user.id, nom: user.nom, prénom: user.prénom, création: user.created, username: user.nom_utilisateur, mail: user.email});
        })
      .catch(error => {
        const message = `L' utilisateur n'a pas pu être récupéré. Réessayez dans quelques instants.`;
        res.status(500).json({ message, data: error});
      })  
}

// requete create user
const { ValidationError, UniqueConstraintError } = require('sequelize');
// const auth = require("../auth/auth");

exports.createUser = async (req, res) => {
  const body = req.body;
  const user = await User.create(req.body)
        .then(user => {
          const message = `L'utilisateur ${user.nom} ${user.prenom} a bien été crée.`;
          res.json({ message, data: user });
        })
        .catch(error => {
          if(error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error});
          }
          if(error instanceof UniqueConstraintError) {
            return res.status(400).json({ message: error.message, data: error});
          }
          // erreur de validation (voir models) => retour erreur 400. Le msg d'erreur défini au niveau du validateur directement dans l'erreur envoyé au client grâce à error.message et tout reste centralisé au niveau du models
          const message = `L'utilisateur n'a pas pu être ajouté. Réessayez dans quelques instants.`;
          res.status(500).json({ message, data: error});
        });
  }
  
  
  
  // module.exports = (app) => {
  //   app.get('/users/:id', (req, res) => {
  //     User.findByPk(req.params.id, {
  //       include: 
  //         ["role_id"]
  //   })
  //     // pas de parseInt car findByPk le fait d'elle même
  //       .then(user => {
  //         if(user === null) {
  //           // findByPk de Sequelize, qui retourne null si aucun résultat n’a été trouvé en base de données, pour l’identifiant fournit en paramètre.
  //         const message = `L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant.`;
  //         return res.status(404).json({ message });
  //         // API Rest fonctionnera correctement du point de vue du client, car vous lui fournirez bien la réponse demandée, mais vous introduisiez dans votre code des effets de bord peu désirables car voir res.json js continue de s'exécuter l15. return => interruption du traitement en cours
  //       }
  //         const message = `Un utilisateur a bien été trouvé.`;
          
  //         res.json({ message, id: user.id, nom: user.nom, prénom: user.prénom, création: user.created, username: user.nom_utilisateur, mail: user.email, role: user.role_id});
  //     })
  //       .catch(error => {
  //         const message = `L' utilisateur n'a pas pu être récupéré. Réessayez dans quelques instants.`;
  //         res.status(500).json({ message, data: error});
  //       })  
  //   })
  // }
  

