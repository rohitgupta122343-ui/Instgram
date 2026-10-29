
const express = require('express')
const userRouter = express.Router()
const userController = require('../controller/user.controller')
const identifyUser = require('../middlewares/auth.middleware')

userRouter.post('/follow/:userId', identifyUser ,userController.followController)

userRouter.post('/unfollow/:userId',identifyUser, userController.unFollowController)


module.exports = userRouter