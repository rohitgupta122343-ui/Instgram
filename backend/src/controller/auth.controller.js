const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function registerController(req,res){


    const {username,email,password,bio,profileImg} = req.body

    const isUserExtist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserExtist){
        return res.status(401).json({
            message : 'user already register'
        })
    }

    const hashPass = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,email,bio,profileImg,password:hashPass
    })

    const token = jwt.sign({id:user._id},process.env.JWT_SECRECT)

    res.cookie('token',token)

    res.status(201).json({
        message : 'user created successfully',
        user:{
            id : user._id,
            email:user.email,
            bio:user.bio,
            profileImg:user.profileImg
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

    const isPassValid = await bcrypt.compare(password,user.password)

    if(!isPassValid){
        return res.status(409).json({
            message : 'Invalid Password'
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRECT)

    res.cookie('token',token)

    res.status(200).json({
        message : 'user Login',
        user : {
            id: user._id,
            username : user.username,
            email : user.email
        }
    })


}

async function getMeController(req,res){

   try{ const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : 'unauthorized user'
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRECT)


   const user = await  userModel.findById(decoded.id)

   res.status(200).json({
    message : 'user fetch successfully',
    user
   })
}catch (err){
    return res.status(401).json({
            message: "Invalid or expired token"
        });
}

}

module.exports = {
    registerController,
    loginController,
    getMeController
}