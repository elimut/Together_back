const { User } = require('../../DB/sequelize');
// const auth = require("../auth/auth");
  
module.exports = (app) => {
  app.get('/users/:id', (req, res) => {
    User.findByPk(req.params.id)
    // pas de parseInt car findByPk le fait d'elle même
      .then(user => {
        if(user === null) {
          // findByPk de Sequelize, qui retourne null si aucun résultat n’a été trouvé en base de données, pour l’identifiant fournit en paramètre.
        const message = `L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant.`;
        return res.status(404).json({ message });
        // API Rest fonctionnera correctement du point de vue du client, car vous lui fournirez bien la réponse demandée, mais vous introduisiez dans votre code des effets de bord peu désirables car voir res.json js continue de s'exécuter l15. return => interruption du traitement en cours
      }

        const message = `Un utilisateur a bien été trouvé.`;
        res.json({ message, data: user });
    })
      .catch(error => {
        const message = `L' utilisateur n'a pas pu être récupéré. Réessayez dans quelques instants.`;
        res.status(500).json({ message, data: error});
      })  
  })
}
