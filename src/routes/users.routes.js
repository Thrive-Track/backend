const express = require('express');
const authMiddleware = require("../middlewares/auth");
const usersControllers = require("../controllers/users.controllers");

const router = express.Router();


router.post('/create-user', usersControllers.createUser);
router.post('/login', usersControllers.login);


module.exports = router;
