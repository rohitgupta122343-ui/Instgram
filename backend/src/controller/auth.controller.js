
const userModel = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function regsiterController(req,res){

    const { username,email,password,bio,profileImg } = req.body

    const isUserExtist = await userModel.findOne({email})

    if(isUserExtist){
        return res.status(409).json({
            message : "user already extist"
        })
    }

    const hashPass = await bcrypt.hash(password,10)

    const user = await userModel.create({
            username,
            email,
            password:hashPass,
            bio,
            profileImg
    })

    const token = jwt.sign({ id:user._id},process.env.JWT_SECRECT)
    
    res.cookie("token",token)

    res.status(201).json({
        message : "user created successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImg:user.profileImg

        }
    })


}

async function loginController(req,res){

    const { username,email,password } = req.body

    const user = await userModel.findOne({
        
        $or:[
            {username},
            {email}
        ]
    })

    if(!user){
        return res.status(404).json({
            message : "user not found"
        })
    }

    const isValidPass = await bcrypt.compare(password,user.password)

    if(!isValidPass){
        return res.status(409).json({
            message : "Password Invalid"
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRECT)

    res.cookie("token",token)

    res.status(200).json({
        message : "user login successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
        }

    })
    

}

module.exports = {
    regsiterController,
    loginController
}