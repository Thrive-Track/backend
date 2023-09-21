const express = require('express');
const tasksControllers = require("../controllers/tasks.controllers");

const router = express.Router();


router.post('/createTask', tasksControllers.createTask);
router.get('/getAllTasks', tasksControllers.getAllTasks);
router.get('/', tasksControllers.getTask);
router.put('/', tasksControllers.updateTask);
router.delete('/', tasksControllers.deleteTask);


module.exports = router;