const Task = require('../models/tasks.model')
const responses = require("../utils/responses");

const createTask = async (payload) => {
    try {
      const newTask = await Task.create(payload);
      console.log(newTask);
      return responses.buildSuccessResponse("Task created successfully", 201, saveTask);
    } catch (error) {
      console.log(error);
      return responses.buildFailureResponse("Failed to create task", 500);
    };  
}

const getAllTasks = async (query) => {
  try {
    const tasks = await tasks.findAll(query);
    return responses.buildSuccessResponse(
      'Successfully fetched all tasks',
      200,
      tasks
    );
  } catch (error) {
    return responses.buildFailureResponse('Failed to fetch tasks', 500);
  }
}

const getTask = async (taskId) => {
  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return responses.buildFailureResponse('Task not found', 404);
    }

    return responses.buildSuccessResponse('Task retrieved successfully', 200, task);
  } catch (error) {
    console.log(error);
    return responses.buildFailureResponse('Failed to retrieve task', 500);
  }
};

const updateTask = async (taskId, payload) => {
  try {
    const task = await task.findByPk(taskId);

    if (!task) {
      return responses.buildFailureResponse('Task not found', 404);
    }
    await task.update(payload);

    return responses.buildSuccessResponse('Task updated successfully', 200, task);
  } catch (error) {
    console.log(error);
    return responses.buildFailureResponse('Failed to update task', 500);
  }
};


const deleteTask = async (taskId) => {
  try {
    const task = await task.findByPk(taskId);

    if (!task) {
      return responses.buildFailureResponse('Task not found', 404);
    }
    await task.destroy();

    return responses.buildSuccessResponse('Task deleted successfully', 204);
  } catch (error) {
    console.log(error);
    return responses.buildFailureResponse('Failed to delete task', 500);
  }
};



  
module.exports = {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
}