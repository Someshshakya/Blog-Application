require('dotenv').config();
const blogs = require('../model/blogs');
const jwt = require('jsonwebtoken');

const Blogs = class {
    // this will insert you data in the database
    async inset_blogs(user_id, data) {
        let date = new Date();
        data['user_id'] = user_id;
        data['writing_date'] = date;
        return await blogs.query().insertGraph(data)
    }
// This will find you blogs by its id
    async find_by_id(user_id,id) {
        const myblogs = await blogs.query()
            .select("*")
            .where("id", id)
            .where('user_id',user_id)
        if (myblogs.length != 0){
            return myblogs
        }else{
            return {msg:"ther are no  such blogs"}
        }
    }
 // This will find your all blogs of the logged user
    async myblog(user_id){
        const allb =  await blogs.query().select("*")
                                .where("user_id",user_id)
        if (allb.length != 0){
            return allb
        }else{
            return {msg:"ther are no  such blogs"}
        }
    }

    // This will update your blogs
    async update(user_id,id,data){
        return await blogs.query().patch(data)
                        .where("id",id)
                        .where("user_id",user_id)

    }
// this will update your blogs
    async delete_by_id(user_id,id){
        return await blogs.query().deleteById(id)
                                .where("user_id",user_id)

    }

    async togetAllblogs(){
        let allb =  await blogs.query().select("*")
        if (allb.length != 0){
            return allb
        }else{
            return {msg:"ther are no  such blogs"}
        }
    }

}
module.exports = Blogs;