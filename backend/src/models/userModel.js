const mongoose = require ('mongoose')
const { renderToString } = require('react-dom/server')

const user = new mongoose.Schema({
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
const userModel = mongoose.model('user',user)
module.exports = userModel