const express = require('express');
const authMiddleware = require("../middlewares/auth");
const usersControllers = require("../controllers/users.controllers");

const router = express.Router();


router.post('/create-user', usersControllers.createUser);
router.post('/login', usersControllers.login);
router.post('/forgot-password', usersControllers.forgotPassword);
router.post('/reset-password', usersControllers.resetPassword);



module.exports = router;
