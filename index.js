// Récupération express
const express = require("express");
const sequelize = require('./src/DB/sequelize');
const bodyParser = require("body-parser");

// Creating an instance of the Express application
// Serveur web sur lequel fonctionnera notre API REST
const app = express();

// port sur lequel nous allons démarrer notre API REST par la suite
const port = process.env.PORT || 8080;

// tests endpoints
// app.get('/', (req, res) => res.send('Hello express'));
// app.get('/user/1', (req, res) => res.send("Hello"));

app.use(bodyParser.json());

// endpoint admin
require("./src/routes/admin/createAdmin")(app);
require("./src/routes/admin/findAllAdmin")(app);
require("./src/routes/admin/findAdmin")(app);
require("./src/routes/admin/deleteAdmin")(app);
require("./src/routes/admin/updateAdmin")(app);

//endpoint user
require("./src/routes/user/createUser")(app);
require("./src/routes/user/deleteUser")(app);
require("./src/routes/user/findUser")(app);
require("./src/routes/user/findAllUser")(app);


// démarre API REST sur port 8080
app.listen(port, () => console.log(`Notre appli Node est démarrée sur : http://localhost: ${port}`));
