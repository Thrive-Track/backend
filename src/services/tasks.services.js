const taskRepo = require("../dataAccess/tasks.repo");
const responses = require("../utils/responses");

const createTask = async (payload) => {
    try {
      const newTask = await taskRepo.create(payload);
      const saveTask = await taskRepo.save(newTask);
  
      return responses.buildSuccessResponse("Task created successfully", 201, saveTask);
    } catch (error) {
      console.log(error);
      return responses.buildFailureResponse("Failed to create task", 500);
    };  
}

  
module.exports = {
    createTask,
}