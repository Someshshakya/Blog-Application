require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookies_parser = require('cookie-parser');
const app = express();

const PORT = process.env.PORT || 5000;

// to use cors
app.use(cors());

// middleware
app.use(express.json());

// using cookies parser
app.use(cookies_parser());

// users
const Users = require('./routes/users');
app.use(Users);

//blogs
const Blogs = require('./routes/blogs')
app.use(Blogs);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})