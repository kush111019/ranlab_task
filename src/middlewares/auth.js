const crypto = require("crypto");
const express=require("express");
const app=express();
const jwt=require("jsonwebtoken");
const validator=require("../validations/validator");
const path=require("path");
const multer=require("multer");
const fs=require("fs");
const imageHash = require('node-image-hash');
const upload=require("express-fileupload");
const formData=require("form-data")
const axios=require("axios");
const formidable=require("formidable");





const securingData=async function(req,res,next){

if(!validator.isValidDetails(req.body)) return res.status(400).send({status:false,message:true});

let {mobile,email,password}=req.body;
let algorithm = 'aes-256-cbc'

let key = crypto.randomBytes(32);

let iv = crypto.randomBytes(16);


let cipher1 = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
let encryptedMobile = cipher1.update(mobile);
encryptedMobile = Buffer.concat([encryptedMobile, cipher1.final()]);


let cipher2 = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
let encryptedEmail = cipher2.update(email);
encryptedEmail = Buffer.concat([encryptedEmail, cipher2.final()]);


let cipher3 = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
let encryptedPassword = cipher3.update(password);
encryptedPassword = Buffer.concat([encryptedPassword, cipher3.final()]);



// imageHash
//   .hash('contentBuffer')
//   .then((hash) => {
//     console.log(hash.hash); // '83c3d381c38985a5'
//     console.log(hash.type); // 'blockhash8'
//   });

// let cipher4 = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
// let encryptedFile = cipher4.update(x.file); encryptedFile = Buffer.concat([encryptedFile, cipher4.final()]);
// res.locals.files=encryptedFile.toString("hex");


  



   


res.locals.mobile=encryptedMobile.toString("hex");
res.locals.email=encryptedEmail.toString("hex");
res.locals.password=encryptedPassword.toString("hex");
res.locals.firstName=req.body.firstName;
res.locals.lastName=req.body.lastName;
res.locals.iv=iv.toString("hex");
res.locals.key=key.toString("hex");
res.locals.algorithm=algorithm;
//res.locals.fileName=file.originalname;

next();

}


const auth = function(req,res,next){
try{
 const token = req.header("Authorization","Bearer Token");
 if(!token)
 return res.status(401).send({status:false,message:"Authentication Token is Required"});
 let tokenSplit = token.split(" ");

 jwt.verify(tokenSplit[1], "somecomplexstring",function(err,decodedToken){
 if(err)
 return res.status(401).send({status:false,message:"Token is NOT Valid"})
 req.userId = decodedToken.userId;
 console.log("hello world world")
 next();
 })

         
 }
 catch(err){
 res.status(500).send({status:false,message:err.message})
 }
}

module.exports = {auth,securingData}