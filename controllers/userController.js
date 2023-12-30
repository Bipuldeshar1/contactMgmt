const asyncHandler = require('express-async-handler');
const User = require ("../model/userModel");
const bcrypt =require("bcrypt");
//desc reg a user
//route Get /api/usser/register
//@acess public
const registerUser = asyncHandler(async (req,res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password)
{
    res.status(400);
    throw new Error("all fields mandatory");
} 
 const userAvailable =await User.findOne({email});
 if(userAvailable){
    res.status(400);
    throw new Error('user already reg');

 }

 //hash psw

 const hashedPassword =await bcrypt.hash(password,10);
 console.log(hashedPassword);
 const user = await User.create({
    username,
    email,
    password:hashedPassword,
 });
 console.log(`${user}`);
 if(user){
    res.status(201).json({_id:user.id,email:user.email});
 }
 else{
    res.status(400);
    throw new Error('user not valid');
 }
 res.json({msg:'user reg'});
});

//desc login a user
//route Get /api/usser/login
//@acess public
const loginUser = asyncHandler(async (req,res) => {
    res.json({msg:'user log'});
});
//desc reg a user
//route Get /api/usser/current
//@acess public
const currentUser = asyncHandler(async (req,res) => {
    res.json({msg:'current user'});
});

module.exports = {registerUser,loginUser,currentUser}