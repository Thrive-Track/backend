const Task = require('../models/tasks.model');

const findAll = async(query = {}) => {
    return await Task.find(query);
}

const findOne = async(query = {}) => {
    return await Task.findOne(query);
}

const create = async (data) => {
    return new Task(data)
}

const save = async (instance) => {
    return await instance.save()
}



module.exports = {
    findAll,
    findOne,
    create,
    save,
}