
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username : {
        type : String,
        required:[true,'username is required creating user'],
        unique:[true,'username is already extist']
    },
    email : {
        type : String,
        required:[true,'email is required creating user'],
        unique:[true,'email is already extist']
    },
    password : {
        type : String,
        required:[true,'username is required creating user'],
    },
    bio:{
        type:String,
        default:''
    },
    profileImg:{
        type:String,
        default:'https://ik.imagekit.io/0wmauyftj/test_ffVZMgxjJD?updatedAt=1786360381623'
    }
})

const userModel = mongoose.model('users',userSchema);
module.exports = userModel