npm init
index.js
Dans le fichier, remplacer test par start dans scripts, et enlever echo => node index.js.
Puis npm run start => script appelle node app.js et démarre projet.
npm install express --save

const express = require("express");
// Creating an instance of the Express application
// Serveur web sur lequel fonctionnera notre API REST
const app = express();

const port = process.env.PORT || 3000;

npm install nodemon --save -dev
**npm install nodemon --save -dev => il existe deux types de dépendances: dépendances du projet dans dependencies, --save et dependencies du projet pendant le développement, devDependencies, comme nodemon.Une fois l'application déployée, elle n'aura pas à être relancée.**
Il faut mettre à jour le script de démarrage: nodemon index.js.

http://localhost:3000/

npm install sequelize --save
