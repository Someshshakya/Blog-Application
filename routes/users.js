const express = require('express');
const router = express.Router();
const User_service = require('../services/users');
const Services = new User_service();
const cookies = require('cookies');

// Home Page
router.get('/',async(req,res) =>{
    try {
        res.send({msg:"you are welcome on home page"})
    } catch (error) {
        res.send({err:error})
    }
})

router.post('/signup',async(req,res) =>{
    try {
        let body = req.body;
        await Services.insertUser(body)
        .then((d)=>{
            res.send({msg:`${d.username} You 😀 are Registered successfully!`})
        }).catch((err)=>{
            console.log(err)
            res.send({errr:err})
        })
    } catch (error) {
        
        res.send({err:error})
    }
})

// for login post
router.post('/login', async(req,res)=>{
    try {
        const body = req.body;
        await Services.login_user(body)
        .then(async(result)=>{
            if (result){
                let email = req.body.email;
                    await Services.create_token(result,email)
                    .then((d)=>{
                        const token = d;
                        res.cookie('user_token',token);
                        res.send({msg:"you are 😀 😀successfully 😀 😀 Logged in."})
                        
                    }).catch((err)=>{
                        console.log(err)
                        res.send({err:err})
                    })
            }else{
                res.send({msg:"plz check  😀 Your  😀 Username 😀 or  😀 password"})
            }
        })
        .catch((err) =>{
            console.log(err);
            res.send({err:err})
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


router.get('/logout', (req, res)=>{
    //it will clear the userData cookie
    res.clearCookie('user_token');
    res.send('user logout successfully');
    });

module.exports = router;