
const ImageKit =  require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const postModel = require('../models/post.model')
const jwt = require('jsonwebtoken')

const imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : 'Token Not Provided, Unauthorized access'
        })
    }
    let decoded
    try{
         decoded = jwt.verify(token,process.env.JWT_SECRECT)
    }catch(err){
        return res.status(401).json({
            message : 'user not authorized'
        })
    }

  

    const {caption,imgUri} = req.body

    console.log(caption,req.file)

   const file =  await imagekit.files.upload({
  file: await toFile(req.file.buffer, 'file'),
  fileName: 'test',
  folder: '/Instagram/posts'
});
     
    const post = await postModel.create({
        caption:req.body.caption,
        imgUri:file.url,
        user:decoded.id
    })

    res.status(201).json({
        message : 'post created successfully',
        post
    })

}

module.exports = {
    createPostController
}