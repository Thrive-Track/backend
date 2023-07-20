const usersServices = require('../services/users.services');

const createUser = async (req, res) => {
    try {
        const data = await usersServices.createUser(req.body);
        res.status(data.statusCode).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
};

const login = async (req, res) => {
    try {
        const data = await usersServices.login(req.body);
        res.status(data.statusCode).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
};

const forgotPassword = async (req, res) => {
    try {
        const data = await usersServices.forgotPassword(req.body);
        res.status(data.statusCode).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
};

const resetPassword = async (req, res) => {
    try {
        const data = await usersServices.resetPassword(req.body);
        res.status(data.statusCode).json(data);
    } catch (error) {
        res.status(500).send(error)
    }
  };



module.exports = {
    createUser,
    login,
    forgotPassword,
    resetPassword,

}