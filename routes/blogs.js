const express = require('express');
const router = express.Router();
const Blogs_service = require('../services/blogs');
const Services = new Blogs_service();
const cookies = require('cookies');

const Auth_verify = require('../Auth/jwt');

// To post the blogs
router.post("/blogs",Auth_verify, async(req,res)=>{
    try{
        data = req.body;
        const user_id = req.data.id;
        await Services.inset_blogs(user_id,data)
        .then((d)=>{
            res.send({msg:d})
        }).catch((err)=>{
            console.log(err)
            res.send({err:err})
        })
    }catch (err){
        res.send({err:err})
    }
})

// To get the blogs by id
router.get("/blogs/:id",Auth_verify, async (req,res) =>{
try {
    const id = req.params.id;
    const user_id = req.data.id;
    await Services.find_by_id(user_id,id)
    .then((blogs)=>{
        res.send(blogs)
    }).catch((err)=>{
        res.send({err:err})
    })

} catch (error) {
    res.send({err:err})
}
})


// to get all the user's  blogs
router.get("/blogs", async (req,res)=>{
    try {
        await Services.togetAllblogs()
        .then((allblogs)=>{
            res.send(allblogs)

        }).catch((err)=>{
            res.send({err:err})
        })
    } catch (error) {
        res.send({err:error})
    }
})

// to get users_blog 
router.get("/myblogs",Auth_verify, async (req,res)=>{
    try {
        const user_id = req.data.id; // to verify the user and to get his/her all blogs
        await Services.myblog(user_id)
        .then((allblogs)=>{
            res.send(allblogs)

        }).catch((err)=>{
            res.send({err:err})
        })
    } catch (error) {
        res.send({err:error})
    }
})

router.put("/update/:id",Auth_verify,async (req,res)=>{
    try {
        const user_id = req.data.id;
        let id = req.params.id;
        let data  = req.body;
        await Services.update(user_id,id,data)
        .then((d)=>{
            res.send({msg: "Your Post has been upated"})
        }).catch((err)=>{
            res.send({err:err})
        })

    }catch (error){
        res.send({err:error})
    }

})


router.delete("/delete/:id",Auth_verify, async(req,res)=>{
    try {
        const id = req.params.id;
        const user_id = req.data.id;
        await Services.delete_by_id(user_id,id)
        .then((blogs)=>{
            res.send({msg: "Your Post deleted !"})
        }).catch((err)=>{
            res.send({err:err})
        })
    
    } catch (error) {
        res.send({err:err})
    }
})
module.exports = router;