//modules
const User = require("./model/designmodel")
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')
const axios = require('axios');

//const User = require('./models/usermodel')
var validator = require('validator');
const server = require('http').createServer(app);
const io = require("socket.io")(server,{cors: {origin:"*"}});

//middlewareS
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const xss = require('xss-clean')

// setting view engine to ejs
app.set('view engine', 'ejs')

//database configure ("monodb/mongoose")
const mongoose = require('mongoose')
const dbname = "phonecases"
const dburl = "mongodb+srv://Avin:avin@cluster0.ayk9r.mongodb.net/"



mongoose.connect(dburl+dbname,
{useNewUrlParser: true},
{useCreateIndex :true},
{strictQuery : true}
).then(()=>{
    console.log("connected to database")
})


//multer
var fs = require('fs');
var path = require('path');
const multer = require('multer')
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});
var upload = multer({ storage: storage });


//using middlewares
//app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())
app.use(xss())
app.use(express.static("public"));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));


//using limiter to limit usages

const limiter = rateLimit({
  max : 100 ,
  windows : 60*60*1000,
  message : "crossed the limit"
})
app.use('/',limiter)

//Routes handler
const home = require('./routes/home')
const cart = require('./routes/cart')
const phones = require('./routes/phones')
const admin = require('./routes/admin')
/*
const authenticateing = require('./routes/authenticate')
const profile = require('./routes/profile')
const userauth = require('./routes/userauth')

*/
//using routes middleware
app.use('/',home )
app.use('/phonecases',phones)
app.use('/cart',cart)
app.use('/admin' , admin)
/*
app.use('/authenticate',authenticateing)
app.use('/profile',profile)
app.use('/user' , userauth)

*/

app.all('*', (req,res,next)=>{
    res.render('pagenotfound')
    next();
})

module.exports =  app



