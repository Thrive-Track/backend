const tasksServices = require('../services/tasks.services');

const createTask = async (req, res) => {
    try {
        const data = await tasksServices.createTask(req.body);
        res.status(data.statusCode).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
};

const getAllTasks = async (req, res) => {
    const data = await tasksServices.getAllTasks(req.query);
    res.status(data.statusCode).json(data);
  };

  const getTask = async (req, res) => {
    const data = await tasksServices.getTask(req.query);
    res.status(data.statusCode).json(data);
  };

  const updateTask = async (req, res) => {
    const data = await tasksServices.updateTask(req.query);
    res.status(data.statusCode).json(data);
  };

  const deleteTask = async (req, res) => {
    const data = await tasksServices.deleteTask(req.query);
    res.status(data.statusCode).json(data);
  };


module.exports = {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
}