const { Admin } = require('../../DB/sequelize');
const { ValidationError, UniqueConstraintError} = require('sequelize');
const bcrypt = require('bcrypt');


module.exports = (app) => {
  app.post('/admins', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log(password);
    bcrypt.hash(password , 10) 
      .then(hash => {
        Admin.create({ username: username , password: hash})
      .then(admins => {
        const message = `L\' administrateur  a bien été créé.`
        res.json({ message, data: admins })
      })
    })
      .catch(error => {
        if(error instanceof ValidationError){ //39 vérifions s'il s'agit d'une erreur de validation de sequelize, si oui c'est de la faute du client --> erreur 4000
          return res.status(400).json({message: error.message, data: error}) // 39 on passe le message d'erreur défini au niveau de notre validateur directement dans l'erreur envoyé au client --> pas de doublons dans les messages d'érreurs et tout reste centralisé
        }
        if(error instanceof UniqueConstraintError){ //47
          return res.status(400).json({message : error.message, data: error})
        }
        const message = 'L\' administrateur n\a pas pu être ajouté. Réessayez dans quelques instants.'
        res.status(500).json({message, data: error})
      })
    })
}