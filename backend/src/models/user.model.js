
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:[true,'username is required'],
        unique:[true,'username is already extist']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:[true,'email is already extist']
    },
    password:{
        type:String,
        required:[true,'email is required']
    },
    bio:String,
    profileImage:{
        type:String,
        default:'https://ik.imagekit.io/0wmauyftj/instagram-clone-post/test_tL4Iz_xGI?updatedAt=1776924959028'
    }

})

const userModel = mongoose.model('users',userSchema)
module.exports = userModel