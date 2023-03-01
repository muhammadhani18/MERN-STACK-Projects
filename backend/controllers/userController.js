const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/userModel');


//register new user
// /api/users
const registerUser = asyncHandler(async (req,res) => {
    const{name,email,password} = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all fields")
    }
    //check if user exists
    const userExist = await User.findOne({email})
    
    
    if(userExist) {
        res.status(400)
        throw new Error("User already exists")
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if(user) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })

    }
    else {
        res.status(400)
        throw new Error("Invalid Data")
    }
  
})
//authenticate new user
// /api/users/login
const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body
    //check for email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid Credentials")
    }
})

//get user data
// /api/users/me
const getUser = asyncHandler(async (req,res) => {
    res.json({message: 'user data'})
})

module.exports = {
    registerUser,
    loginUser,
    getUser,
};