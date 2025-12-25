const express = require ('express')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const User =require ('../models/userModel')

async function registerUser(req,res) {
    const {email,password }= req.body
    if (!email||!password){
        return res.status(400).json({message:"all fields required"})
    }
    const ExistingUser = await User.findOne({email})
    if(ExistingUser){
        return res.status(400).json({messsage :"user already exists "})
    }
    const hashedpassword = await bcrypt.hash(password,10)
    const newUser  = await  User.create({
        email,
        password:hashedpassword
    })
    const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET)
    res.cookie("token",token,{
        httpOnly:true,
        sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return res.status(201).json ({message:"user registered successfully "})
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );


    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({message:"logout successful"})
}
module.exports= {
    registerUser,
    loginUser,
    logoutUser,
}