const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function registerController (req,res){

    const {username,email,password,bio,profileImage} = req.body

    console.log(username,email,password,bio)

    const isUserExtist = await userModel.findOne({
        $or:[
            {email},{username}
        ]
    })

    if(isUserExtist){
        return res.status(409).json({
            message : 'user already extist' + (isUserExtist.email == email?
                'email already extist':'username already extist')
        })
    }

    const user = await userModel.create({
        username,
        email,
        password,
        bio,
        profileImage
    })

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message : 'user created successfully',
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })


}

async function loginController(req,res){

    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(!user){
        return res.status(404).json({
            message : 'user not found'
        })
    }

    const isPasswordValid = password == user.password

    if(!isPasswordValid){
        return res.status(401).json({
            message : 'password Invalid'
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message : 'user login successfully',
         user:{
            id:user._id,
            username:user.username,
            email:user.email,
        }
    })
}

module.exports ={
    registerController,
    loginController
}