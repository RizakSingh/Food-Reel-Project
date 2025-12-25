const app = require ('./src/app')



app.listen(process.env.PORT,()=>{
    try{
        console.log("server is running ")
    }catch(err){
        console.log(err)
    }
})