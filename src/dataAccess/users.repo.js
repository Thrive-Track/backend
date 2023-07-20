const User = require('../models/users.model');

const findAll = async(query = {}) => {
    return await User.find(query);
}

const findOne = async(query = {}) => {
    return await User.findOne(query);
}

const create = async (data) => {
    return new User(data)
}

const save = async (instance) => {
    return await instance.save()
}

const update = async (query, update, options = { new:true }) => {
    return await User.findOneAndUpdate(query, update, options)
}


module.exports = {
    findAll,
    findOne,
    create,
    save,
    update
}