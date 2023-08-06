const express = require("express");



module.exports = (app) => {
    const { findUser } = require("../controllers/users.controller");
    const router = require("express").Router();

    router.get('/:id', findUser);

    app.use('/users', router);

};
// const express = require("express");
// const router = express.Router();
// // const userController = require("../controllers/users.controller");
// const { findUser } = require("../controllers/users.controller");

// router.get('/users/:id', findUser);

// module.exports = router;

