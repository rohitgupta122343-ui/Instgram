
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    caption:{
        type:String,
        default:''
    },
    imgUri:{
        type:String,
        required:[true,'Image Uri is required creating Post']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:[true,'userId is required to creating post']
    }
    
})

const postModel = mongoose.model('posts',postSchema)
module.exports = postModel

