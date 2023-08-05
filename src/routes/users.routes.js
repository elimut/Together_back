const express = require("express");
const router = express.Router();
const findUser = require("../controllers/users.controller")

module.exports = router;

router.get('/users/:id', findUser);

