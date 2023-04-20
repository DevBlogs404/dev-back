import jwt from 'jsonwebtoken'

export const isLoggedIn = async (req,res,next)=>{
    try {
        const verify = await jwt.verify(req.headers.authorization,process.env.RANDOM_KEY)
        next()
    } catch (error) {
        console.log(error);
    }
}