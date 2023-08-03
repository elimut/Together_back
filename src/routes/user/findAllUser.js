const { User } = require("../../DB/sequelize");
// const auth = require("../auth/auth");
const { Op } = require('sequelize');
  
module.exports = (app) => {

  app.get('/users', (req, res) => {

    if(req.query.lastname || req.query.firstname || req.query.email) {
      const lastname = req.query.lastname;
      const firstname = req.query.firstname;
      const email = req.query.email;
      const limitUser = parseInt(req.query.limit) || 5; //tuto, vérifier ternaire
      let result = "";
      if(lastname) {
        result = lastname;
      }

      if(firstname) {
        result = firstname;
      }
      if(email) {
        result = email;
      }

      if(result.length < 2){
        const message = "Le terme de la recherche doit contenir au moins deux caractères. Réessayez.";
        return res.status(400).json({ message});
      }
    
      return User.findAndCountAll({ 
        where: { 
        // va chercher 2 infos en bdd: nombre total et résultats demandés
          lastname: { 
            [Op.like]: `%${lastname}%` 
          },
          firstname: { 
            [Op.like]: `%${firstname}%` 
          },
          email: { 
            [Op.like]: `%${email}%` 
          }
        },
        order: ['lastname'],
        // nous passons un tableau contenant deux informations: la prop du models Sequelize, sur laquelle on souhaite ordonner les résultats et l'ordre croissant ou décroissant, par défaut croissant
        limit: limitUser
      })
      .then(({count, rows}) => {
        const message =  `Il ya ${count} utilisateurs qui correspondent au terme de la recherche.`;
        res.json({ message, data: rows});
      })
      // on récupère les deux informations retournées par la méthode. Paramètres imposés par findAndCountAll, on récupère donc les var count et rows à la place de pokémons.
    } else {

    User.findAll({ order: ['lastname'] })
    // findAll retourne une promesse = requête que Sequelize va effectuer à la bdd => échoue ou réussit
      .then(users => {
        const message = 'La liste des utilisateurs a bien été récupérée.'
        res.json({ message, data: users });
      })
      .catch(error => {
        const message = "La liste des utilisateurs n'a pas pu être chargée. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error.message});
      });
      // interception des erreurs avec la méthode catch des promesses de JS. Une fois capturée il reste à retourner un message d'erreur 
    }
  })
}
