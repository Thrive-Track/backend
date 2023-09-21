const usersServices = require('../services/users.services');

const signUp = async (req, res) => {
    try {
        const data = await usersServices.signUp(req.body);
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

module.exports = {
    signUp,
    login,

}