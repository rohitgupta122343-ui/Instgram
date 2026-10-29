
const jwt = require('jsonwebtoken')

 function identifyUser(req,res,next){

    const token = req.cookies.token

    let decoded;

try{      decoded = jwt.verify(token,process.env.JWT_SECRECT)
}catch(err){
    return res.status(401).json({
        message:"unauthorized"
    })
}

req.user = decoded

next()

}

module.exports = identifyUser