const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const responses = require("../utils/responses");


const signUp = async (payload) => {
    try {
        const foundEmail = await User.findOne({where: {email: payload.email} });
        if(foundEmail) {
            return responses.buildFailureResponse("Email already exists", 400) 
        }

        const foundUsername = await User.findOne({ where: {username: payload.username }});
        if(foundUsername) {
            return responses.buildFailureResponse("Username already in use", 400) 
        }  

    // hashing the password
    const saltRounds = 10;
    const generatedSalt = await bcrypt.genSalt(saltRounds)

    payload.password = await bcrypt.hash(payload.password, generatedSalt);
    
    const newUser = await User.create(payload);
    console.log(newUser);
    return responses.buildSuccessResponse("User created successfully", 201, newUser);

    } catch (error) {
        return responses.buildFailureResponse(error?.message, error?.statusCode)
    }
}


const login = async (payload) => {
    try {
        const foundUser = await User.findOne({email: payload.email});
        if(!foundUser) {
            return responses.buildFailureResponse("Invalid email address", 400) 
        }

        const validPassword = await bcrypt.compare(payload.password, foundUser.password);
        if(!validPassword) {
            return responses.buildFailureResponse("Invalid password", 400) 
        }

         const token = jwt.sign({email: foundUser.email}, process.env.JWT_SECRET, {
              expiresIn: '30minutes'
       })
       foundUser.accessToken = token
       return responses.buildSuccessResponse("Login successful", 200, foundUser)

    } catch (error) {
        return responses.buildFailureResponse(error?.message, error?.statusCode)
    }
}


    module.exports = {
    signUp,
    login
}