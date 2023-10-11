const mongoose = require('mongoose')
const crypto = require('crypto')
const validator = require('validator')
const passportlocalMongoose = require("passport-local-mongoose")
const findOrCreate = require('mongoose-findorcreate')
const DesignSchema = new mongoose.Schema({
    desing_image: {
        type : String
    },
    catagory:{
        type: String,
        enum : ["Anime" , "Classic", "marble desing" , "Classic Dark" , "customised Photo" ,"customised Design" , "Marval" , "fumky" , "tradditional", "custom Name" ,'sports', 'others']
    },
    phone_shown:{
        type: String,
        enum :[
        "iphone" , "samsung" , "oneplus" , "Xaomi" ,"all" , "others"
        ]
    }
})
const Design_pic =  mongoose.model('Design_pic', DesignSchema)
module.exports = Design_pic