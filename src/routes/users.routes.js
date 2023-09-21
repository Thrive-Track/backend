const express = require('express');
const authMiddleware = require("../middlewares/auth");
const usersControllers = require("../controllers/users.controllers");
const inputValidators = require("../middlewares/inputValidators");

const router = express.Router();


router.post('/signup', inputValidators.signUpValidator, usersControllers.signUp);
router.post('/login', /*authMiddleware.authenticate,*/ inputValidators.loginValidator, usersControllers.login);


module.exports = router;
