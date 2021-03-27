require('dotenv').config();
const User = require('../model/users');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
// thes are the services for the users
const Users = class {
    // this will insert your data in the db
    async insertUser(result){
        let password = result.password;
        password = await bcrypt.hash(password,5)
        result['password'] = password
        return await User.query().insertGraph(result);
    }
    // to login the user in 
    async login_user(login_data){
        let plainText = login_data.password;
        const email = login_data.email

        const has = await User.query().select("password")
                            .where('email',email)

        if (has.length!=0){
            let hassP = has[0].password;
            let result = await bcrypt.compare(plainText,hassP)
            if (result){
                return true
            }else{
                return false 
            }
            
            
        }else{
            return false
        }   
    }

    // to create a token 
    async create_token(value,email){
        if (value==true){
            console.log("true")
            const pay_load = await User.query().select("*")
            .where('email',email)
            let mytext = {username : pay_load[0].username,
                            email : pay_load[0].email,
                            id : pay_load[0].id,
                            password : pay_load[0].password
                        }
        const token = await jwt.sign(mytext,process.env.MY_SECRET);
            return token
        }else{
            return false
        }
        
    }
}
module.exports = Users;

