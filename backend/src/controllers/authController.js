const express = require ('express')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken ')
const user =require ('../models/userModel')

async function registerUser(req,res) {
    const {email,password }= req.body
    if (!email||!password){
        return res.status(400).json({message:"all fields required"})
    }
    const ExistingUser = await user.findOne({email})
    if(ExistingUser){
        return res.status(400).json({messsage :"user already exists "})
    }
    const hashedpassword = await bcrypt.hash(password,10)
    const newUser  = await  user.create({
        email,
        password:hashedpassword
    })
    const token = jwt.sign({id:newUser._id},process.env.JWT_TOKEN)
    res.cookie("token",token,{
        httpOnly:true,
        sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return res.status(201).json ({message:"user registered successfully "})
}
module.exports= {
    registerUser,
}