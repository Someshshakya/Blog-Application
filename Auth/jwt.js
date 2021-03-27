require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookies = require('cookies');
const users = require('../model/users')

module.exports = async(req,res,next)=>{
    let my_token = req.cookies.user_token;
    if (my_token!=undefined){
        let data = await jwt.verify(my_token,process.env.MY_SECRET)
        req.data  = data;
        next()
    }else{
        res.send({msg:"Plz Login First"})
    }
    
    

}