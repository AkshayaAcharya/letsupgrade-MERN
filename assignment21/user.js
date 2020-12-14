const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const router = express.Router();
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: String,
    email: String, 
    password: String,
    country: String,
    age: Number,
    weight: Number
})

let salt = "secretkey";
let tokenKey = "tokenkey"
const userModel = new mongoose.model("users", userSchema);


mongoose.connect("mongodb://127.0.0.1:27017/assignment21",{ useNewUrlParser: true, useUnifiedTopology: true} ).then(()=>{
    console.log("Connected to MongoDB");
})

//register
router.post("/register", (req, res)=>{
    let user = req.body;
    user.password = crypto.pbkdf2Sync(user.password, salt, 1000, 64, "sha512").toString('hex')
    let userObj = new userModel(user);
    userObj.save().then(()=>{
        res.send({"message":"User Registered"})

    })    
})


//login
router.post("/login", async(req, res)=>{
    let userCredentials = req.body;
    userCredentials.password = crypto.pbkdf2Sync(userCredentials.password, salt, 1000, 64, "sha512").toString('hex')
    let userCount = await userModel.find(userCredentials).countDocuments();
    if(userCount == 1){
        jwt.sign(userCredentials, tokenKey, (err, token)=>{
            if(err!=null){
                res.send({"message": "Some pbm try after some time"})
            } else {
                res.send({token});
            }
        })
    } else {
        res.send({"message": "wrong username or password"})
    }
})
module.exports = router;