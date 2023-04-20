import User from '../models/User.js'
import {hashPass,comparePass} from '../helpers/authHelper.js'
import jwt from 'jsonwebtoken'

//register api
export const registerContoller = async(req,res)=> {
try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({email})
    if(existingUser){
        res.status(200).send({
            success:true,
            message:"Already registered, please login"
        })
    }
    const hashedPass = await hashPass(password);
    let user =  new User({ name, email, password: hashedPass });
    await user.save();
    res.status(201).send({
        success:true,
        message:"successfully registered",
        user
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error registering user",
        error
    })
}
}

// login api
export const loginController = async(req,res)=>{
try {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(404).send({success:false,message:"Invalid email or password"})
    }
    const user = await User.findOne({ email: email });
    if(!user){
        res.status(404).send({message:"please register first"})
    }
    const isMatch = await comparePass(password,user.password)
    if(!isMatch){
        res.status(200).send({success:false,message:"Invalid password"})
    }
    const token = await jwt.sign({_id:user._id},process.env.RANDOM_KEY)
    res.status(200).send({
        success:true,
        message:"login successful",
        user:{
            name:user.name,
            email:user.email
        },
        token
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"error logging in",
        error
    })
}
}