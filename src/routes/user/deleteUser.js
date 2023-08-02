const { User } = require('../../DB/sequelize');
// const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete('/users/:id', (req, res) => {
    User.findByPk(req.params.id).then(user => {
      if(user === null){
        const message = `L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant.`;
        return res.status(404).json({message});
      }

      const userDeleted = user;
      return User.destroy({
        // return pour factoriser l'erreur 500
        where: { id: user.id }
      })
      .then(_ => {
        const message = `L'utilisateur avec l'identifiant n°${userDeleted.id} a bien été supprimé.`;
        res.json({message, data: userDeleted });
      })
    })
    .catch(error => {
      const message = `L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error});
    })  
  })
}