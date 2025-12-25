const express= require ('express')
const cookie = require ('cookie-parser')
const app = express()

app.use(express.json())
app.use(cookie())
module.exports= app 