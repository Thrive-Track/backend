const express = require('express');
const tasksControllers = require("../controllers/tasks.controllers");

const router = express.Router();


router.post('/create-task', tasksControllers.createTask);


module.exports = router;