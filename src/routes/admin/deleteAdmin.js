const { Admin } = require('../../DB/sequelize');
// const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete('/admins/:id', (req, res) => {
    Admin.findByPk(req.params.id).then(admin => {
      if(admin === null){
        const message = `L'adminstrateur demandé n\'existe pas. Réessayez avec un autre identifiant.`;
        return res.status(404).json({message});
      }

      const adminDeleted = admin;
      return Admin.destroy({
        // return pour factoriser l'erreur 500
        where: { id: admin.id }
      })
      .then(_ => {
        const message = `L'administrateur avec l'identifiant n°${adminDeleted.id} a bien été supprimé.`;
        res.json({message, data: adminDeleted });
      })
    })
    .catch(error => {
      const message = `L'administrateur n'a pas pu être supprimé. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error});
    })  
  })
}