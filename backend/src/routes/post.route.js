
const express = require('express')
const multer = require('multer')
const PostController = require('../controller/post.controller')
const upload = multer({storage:multer.memoryStorage()})

const postRouter = express.Router()

postRouter.post('/',upload.single('image'),PostController.createPostController)

module.exports = postRouter