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
}