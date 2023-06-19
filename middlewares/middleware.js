
const bcrypt = require('bcrypt');
const {getUserByUsername}=require("../db/db");
const  jwt = require('jsonwebtoken');
const User=require("../db/schemas/User");




const encryptPassword=(req,res,next)=>{
    const saltRounds = 10;

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        req.body.password=hash

      console.log(req.body.password)

     
    
       next();

        
    });


}

const checkPassword=(req,res,next)=>{
    const user=getUserByUsername(req.body.username);
    if(user){
        bcrypt.compare(req.body.password, user.password, function(err, result) {
             if(!result){
                next(new Error("Please enter correct username or password"))
            }else{
                const  token = jwt.sign({username:req.body.userName}, process.env.JWTKEY);
            res.json({
                 status:"Success",
                 token:token,
                 message:"User Logged In"
         
             })
            }
        
        });
    }else{
        next(new Error("User Not found"))
    }

}


  module.exports = {
    encryptPassword,
    checkPassword
  }