const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        enum: ["personalTasks", "workActivities", "teamProjects"],
        required: true
    },
    experienceLevel: {
        type: String,
        enum: ["beginner", "intermediate", "expert"],
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)