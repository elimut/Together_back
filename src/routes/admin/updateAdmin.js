const { Admin } = require('../../DB/sequelize');
const { User } = require('../../DB/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const admin = require('../../models/user');
// const auth = require("../auth/auth");
  
module.exports = (app) => {

    app.put('/:table/:id',  (req, res) => {

        const table = req.params.table;
        const id = req.params.id;
        var models = "";

        (table === "admins") ? models = Admin 
        : (table === "users") ? models = User
        : res.status(404).json('Url incorrecte');

            models.update(req.body, {
            where: { id: id }
            })
            .then(_ => {

                return models.findByPk(id).then(ressource => {
                    if(ressource === null) {
                    const message = `La ressource demandée demandé n'existe pas. Réessayez avec un autre identifiant`;
                    return res.status(404).json({ message });
                    }
                    // return de la promesse findByPk pour supprimer la dupli de code erreur 500. Permet de transmettre l'erreur éventuelle de la méthode findByPk dans le bloc catch plus bas
                    const message = (models = Admin ) ? `L'administrateur ${ressource.username} a bien été modifié.` 
                    : `L'utilisateur ${ressource.lastname} ${ressource.firtsname} a bien été modifié.`
                    res.json({message, data: ressource })
                })
            })
            .catch(error => {

                if(error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error});
                }
                if(error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: error.message, data: error});
                }

            const message = `La ressource n'a pas pu être modfié. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: error});
            });
    });
}