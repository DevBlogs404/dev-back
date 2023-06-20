const jwt = require('jsonwebtoken')

exports.isLoggedIn = async (req,res,next)=>{
    try {
        const verify = await jwt.verify(req.headers.authorization,process.env.RANDOM_KEY)
        
    } catch (error) {
        console.log(error);
        next()
    }
}