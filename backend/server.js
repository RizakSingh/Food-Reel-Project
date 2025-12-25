const app = require ('./src/app')
const mongo = require('./src/db/db')
const cookie = require ('cookie-parser')
require('dotenv').config()
mongo()


app.listen(process.env.PORT,()=>{
    try{
        console.log("server is running ")
    }catch(err){
        console.log(err)
    }
})