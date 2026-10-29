
const followModel = require('../model/follow.model')
const userModel = require('../model/user.model')

async function followController(req,res){

   const followee = req.params.userId


    if(req.user.id == req.params.userId){
        return res.status(400).json({
            message : "You Can't follow Yourself"
        })
    }

    const isFolloweeExtist = await userModel.findById({
        _id : followee
    })
    
    if(!isFolloweeExtist){
        return res.status(404).json({
            message : "Followee not extist"
        })
    }

    const isAlreadyFollow  = await followModel.findOne({
        follower : req.user.id,
        followee : req.params.userId
    })

    if(isAlreadyFollow){
        return res.status(200).json({
            message : `You are Already follow the ${req.params.userId} `,
            follow : isAlreadyFollow
        })
    }

    const follow = await followModel.create({

        follower:req.user.id,
        followee:req.params.userId

    })

    res.status(201).json({
        message : "follow sucessfully",
        follow
    })

}

async function unFollowController(req,res){
    
     const followerId = req.user.id
     const followeeId = req.params.userId

    const isFollowing = await followModel.findOne({
        follower : followerId,
        followee : followeeId
    })

    if(!isFollowing){
        return res.status(400).json({
            message : `you are not following ${followeeId}`
        })
    }

    await followModel.findByIdAndDelete(isFollowing.id)

    res.status(200).json({
        message : `you are unfollow the ${followeeId}`
    })
}

module.exports = {
    followController,
    unFollowController
}