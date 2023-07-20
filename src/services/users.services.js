const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const userRepo = require("../dataAccess/users.repo");
const responses = require("../utils/responses");
const { sendForgotPasswordMail } = require("../utils/sendMail");
const generateResetPin = require("../utils/generateResetPin");

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
     
    try {
        const emailFound = await userRepo.findOne({email: payload.email})
        if(!emailFound) {
            return responses.buildFailureResponse("Email not found", 400)
        }
        const resetPin = generateResetPin()
        const updatedUser = await userRepo.update({_id: emailFound._id}, {resetPin: resetPin}, {new: true})
    
        const mailPayload = {
            to: updatedUser.email,
            subject: "Forgot Password",
            pin: resetPin
        }
        
        await sendForgotPasswordMail(mailPayload)
        return responses.buildSuccessResponse("Forgot Password Successful", 200, updatedUser)
    } catch (error) {
        return responses.buildErrorResponse(error, 500)
    }
}

const resetPassword = async (payload) => {
    try {
        /**
         * Validate if user exists with reset pin
         * Hash the new password
         * Store the new hashed password
         */
    
        const foundUserAndPin = await userRepo.findOne({
          email: payload.email,
          resetPin: payload.resetPin,
        });
        
        if (!foundUserAndPin) {
          return responses.buildFailureResponse('Reset Pin Invalid', 400);
        }
      
        // hashing the password here
        const saltRounds = 10;
        const generatedSalt = await bcrypt.genSalt(saltRounds);
      
        const hashedPassword = await bcrypt.hash(payload.password, generatedSalt);
      
        const updatedUser = await userRepo.update(
          { _id: foundUserAndPin._id },
          { password: hashedPassword, resetPin: null },
          { new: true }
        );
      
        return responses.buildSuccessResponse(
          'Password Reset Successful',
          200,
          updatedUser
        );
    } catch (error) {
        return responses.buildFailureResponse(error, 500)
    }
  };

    module.exports = {
    createUser,
    login,
    forgotPassword,
    resetPassword
}