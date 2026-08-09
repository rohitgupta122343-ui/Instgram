const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function RegisterController(req,res){

    const {username,email,password,bio,profileImage} = req.body

    const isUserExtist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })



    if(isUserExtist){
        return res.status(409).json({
            message : 'user already extist'+(isUserExtist.username == username?
            ' with a username ':' with a email ')
        })
    }

    const user = await userModel.create({
        username,
        email,
        password,
        bio,
        profileImage
    })

    const token = jwt.sign({id:user._id},process.env.JWT_SECRECT)

    res.cookie("token",token)

    res.status(201).json({
        message : 'user created successfully',
        user:{
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

    const isPassValid = user.password == password

    if(!isPassValid){
        return res.status(401).json({
            message : 'password Invalid'
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRECT)

    res.cookie("token",token)

    res.status(200).json({
        message : 'user login'
    })

}

module.exports = {
    RegisterController,
    loginController
}