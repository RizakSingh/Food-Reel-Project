const mongoose = require ('mongoose')
const { renderToString } = require('react-dom/server')

const User = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    }
   
})
const UserModel = mongoose.model('User',User)
module.exports = UserModel