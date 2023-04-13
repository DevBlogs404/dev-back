const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const path = require('path')
const multer = require('multer')

require('./db/connection');
const User = require("./db/User")
// require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");
app.set("views",path.resolve('./views'))
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,`./images`)
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname.trim()}`)
    }
})

const upload = multer({storage:storage} )



// const middleWare =async(req,res,next)=>{
//     const {name,email,password} = req.body;
//     const token = jwt.sign({name,email,password},"kfvmdjfvndjvnjdg")
//     // console.log(token);
//     if(token){
//         res.cookie("token",token)
//     }
//     next()
// }

//register api
app.post('/register',async(req,res)=>{
try {
    const { name, email, password } = req.body;
    let hashedPass = await bcrypt.hash(password,10)
    let user =  new User({name,email,password:hashedPass});
    let result = await user.save()
    result = result.toObject()
    delete result.password
    res.send(result)
} catch (error) {
    console.log(error)
}
});

// login api
app.post('/login',async(req,res)=>{
   try {
    const {email,password} = req.body;
    // if(email && password){
        let user = await User.findOne({email:email})
        // if(!email){
        //     res.status(400).send({message:"email not found"})
        // }
        // if(password !== user.password){
        //     res.status(400).send({message:"password does not match"})
        // }
        // res.json({user})

   const token = jwt.sign({email,password},"kfvmdjfvndjvnjdg")
     if(token){
        res.cookie("token",token)
     }
        const isMatch = bcrypt.compare(password,user.password)
        if(isMatch){
            user = user.toObject();
        delete user.password
        res.send({user})
        }
    // }
   } catch (error) {
    res.status(500).send("error")
   };
});

// uploading prodcuct details and pictures
app.post('/upload',upload.array("profile",5),(req,res)=>{
    console.log(req.body);
    console.log(req.files);
    res.redirect('/')
})

app.use('/',(req,res)=>{
     res.render('test')
})
app.listen(4000,()=>{
    console.log(`app running at 4000`)
});
