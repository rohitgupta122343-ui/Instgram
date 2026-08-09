
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username : {
        type : String,
        unique : [true,"username already extist"],
        required : [true,"username is required"]
    },
    email : {
        type:String,
        unique : [true,"email already extist"],
        required : [true,"email is required"]
    },
    password:{
         type:String,
         required : [true,"password is required"]
    },
    bio:String,
    profileImage: {
  type: String,
  default: "https://ik.imagekit.io/0wmauyftj/instagram-clone-post/test_tL4Iz_xGI?updatedAt=1776924959028"
}
    

})

const userModel = mongoose.model("users",userSchema)
module.exports = userModel