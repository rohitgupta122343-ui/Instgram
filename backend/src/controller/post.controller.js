
const postModel = require('../model/post.model')
const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')

const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    

     const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
   fileName: 'fileName',
   floderPath: 'Instagram/posts'
     })

     const post = await postModel.create({
        caption:req.body.caption,
        imgUri:file.url,
        user:req.user.id
     })


     res.status(201).json({
        message : "post created sucessfully",
        post
     })

}

async function getPostController(req,res){


   
    const posts = await postModel.find({
        user:req.user.id
    })

    res.status(200).json({
        message : "post fetch sucessfully",
        posts
    })

}

async function getPostDetailsController(req,res){
    

    

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    const isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message : "forbidden content."
        })
    }

    res.status(200).json({
        message : "post fetch sucessfully",
        post
    })


}


module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}