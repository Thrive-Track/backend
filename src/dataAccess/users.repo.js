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

const findByIdAndUpdate = async (data) => {
    return await User.findByIdAndUpdate(data._id, data, { new: true })
}


module.exports = {
    findAll,
    findOne,
    create,
    save,
    findByIdAndUpdate
}