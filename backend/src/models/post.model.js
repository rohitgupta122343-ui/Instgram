
const mongoose = require('mongoose')

const postSchema = mongoose.Schema({

    caption:{
        type:String,
        default:""
    },
    user:{
        ref:'users',
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'userId is required to creating post']
    },
    imgUrl:{
        type:String,
        required:[true,'imgUrl is required to creating post']
    }
})

const postModel = mongoose.model('posts',postSchema)
module.exports = postModel