
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    caption:{
        type:String,
        default:""
    },
    imgUri:{
        type:String,
        required:[true,'imgUrl is required']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
})

const postModel = mongoose.model('posts',postSchema)

module.exports = postModel