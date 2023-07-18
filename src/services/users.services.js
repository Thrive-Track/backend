const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const userRepo = require("../dataAccess/users.repo");
const responses = require("../utils/responses");

const createUser = async (payload) => {
    try {
        const foundEmail = await userRepo.findOne({email: payload.email});
        if(foundEmail) {
            return responses.buildFailureResponse("Email already exists", 400) 
        }

        const foundUsername = await userRepo.findOne({username: payload.username});
        if(foundUsername) {
            return responses.buildFailureResponse("Username already in use", 400) 
        }  

    // hashing the password
    const saltRounds = 10;
    const generatedSalt = await bcrypt.genSalt(saltRounds)

    payload.password = await bcrypt.hash(payload.password, generatedSalt);
    
    const newUser = await userRepo.create(payload);
    const saveUser = await userRepo.save(newUser);
    return responses.buildSuccessResponse("User created successfully", 201, saveUser);

    } catch (error) {
        return responses.buildFailureResponse(error?.message, error?.statusCode)
    }
}


const login = async (payload) => {
    try {
        const foundUser = await userRepo.findOne({email: payload.email});
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

const forgotPassword = async (payload)=> {
     
    const emailFound = await User.findOne({email: payload.email})
    if(!emailFound) {
        return responses.buildFailureResponse("Email not found", 400)
    }
    const resetPin = generateResetPin()
    const updatedUser = await User.findByIdAndUpdate({_id: emailFound._id}, {resetPin: resetPin}, {new: true})
    
    await sendMail(updatedUser.contactEmail)
    return responses.buildSuccessResponse("Forgot Password Successful", 200, updatedUser)
}

    module.exports = {
    createUser,
    login,
    forgotPassword,
}