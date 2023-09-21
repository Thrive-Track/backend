const jwt = require('jsonwebtoken')
const User = require('../models/users.model');


async function authenticate(req, res, next) {
    try {
        const authorization = req.headers.authorization
        if(!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(400).json({
                message: "Authorization header must start with 'Bearer '",
                status: "failure"
            })
        }
        const token = authorization.substring(7)
        
        const decodedUser = await jwt.decode(token)
        
        const foundUser= await User.repofindOne({_id: decodedUser._id})
        
        if(foundUser.role !== 'user') {
            return res.status(400).json({
                message: "Only registered users are allowed to login",
                status: "failure"
            })
        }
        req.user = foundUser
        next()
    } catch (error) {
        return res.status(error?.statusCode || 500).send(error?.message || "Unable to authenticate")
    }
}

module.exports = {
    authenticate
}

const request = {
    headers: {
        "Content-Type": "application/json",
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpbnVzQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkxpbnVzIiwicm9sZSI6ImFkbWluIiwiX2lkIjoiNjRhNDE3MTYxYzI1YzkwNDVlOWEyMTI5IiwiaWF0IjoxNjg4NTU3ODEwLCJleHAiOjE2OTExNDk4MTB9.dWMRn39YhFOXq1VxqbicKVPohGKxVFa_8iLtcp_jy-A" 
    },
    body: {

    }
};