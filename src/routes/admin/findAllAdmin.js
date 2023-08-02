const { Admin } = require("../../DB/sequelize");
// const auth = require("../auth/auth");
const { Op } = require('sequelize');
  
module.exports = (app) => {
  app.get('/admins', (req, res) => {
    if(req.query.username) {
      const username = req.query.username;
      const limitUser = parseInt(req.query.limit) || 5; //tuto, vérifier ternaire

      if(username.length < 2){
        const message = "Le terme de la recherche doit contenir au moins deux caractères. Réessayez.";
        return res.status(400).json({ message});
      }

      return Admin.findAndCountAll({ 
        where: { 
        // va chercher 2 infos en bdd: nombre total et résultats demandés
          username: { 
            [Op.like]: `%${username}%` 
          }
        },
        order: ['username'],
        // nous passons un tableau contenant deux informations: la prop du models Sequelize, sur laquelle on souhaite ordonner les résultats et l'ordre croissant ou décroissant, par défaut croissant
        limit: limitUser
      })
      .then(({count, rows}) => {
        const message =  `Il ya ${count} administrateurs qui correpondent au terme de la recherche ${username}`;
        res.json({ message, data: rows});
      })
      // on récupère les deux informations retournées par la méthode. Paramètres imposés par findAndCountAll, on récupère donc les var count et rows à la place de pokémons.
    } else {
    Admin.findAll({ order: ['username'] })
    // findAll retourne une promesse = requête que Sequelize va effectuer à la bdd => échoue ou réussit
      .then(admins => {
        const message = 'La liste des administrateurs a bien été récupérée.'
        res.json({ message, data: admins });
      })
      .catch(error => {
        const message = "La liste des administrateurs n'a pas pu être chargée. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error});
      });
      // interception des erreurs avec la méthode catch des promesses de JS. Une fois capturée il reste à retourner un message d'erreur 
    }
  })
}
