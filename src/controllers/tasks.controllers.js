const tasksServices = require('../services/tasks.services');

const createTask = async (req, res) => {
    try {
        const data = await tasksServices.createTask(req.body);
        res.status(data.statusCode).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
};


module.exports = {
    createTask,
}