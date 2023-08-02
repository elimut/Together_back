const { User } = require('../../DB/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const user = require('../../models/user');
// const auth = require("../auth/auth");
    
module.exports = (app) => {
  app.post('/users', (req, res) => {
    User.create(req.body)
      .then(user => {
        const message = `L'utilisateur ${user.lastname} ${user.firstname} a bien été crée.`;
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
  });
}