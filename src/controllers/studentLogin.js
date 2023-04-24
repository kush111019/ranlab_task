const studentDetailsModel=require("../models/studentDetails");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator=require("../validations/validator");

const login=async function(req,res){

const loginData = req.body;

const { email,password } = loginData;


if (!validator.isValidDetails(loginData))
return res.status(400).send({ status: false, message: "Invalid Request" });

if(!validator.isValidValue(email))
return res.status(400).send({status:false,message:"EmailId is Required"});

if(!validator.isValidEmail(email))
return res.status(400).send({status:false,message:"Please provide valid Email Address"});

if(!validator.isValidValue(password))
return res.status(400).send({status:false,message:"Password is Required"});


const studentDetail = await studentDetailsModel.findOne({email});
if(!studentDetail)
return res.status(401).send({status:false,message:"EmailId is NOT Correct"});
         
 let hashedPassword = studentDetail.password;

 bcrypt.compare(password, hashedPassword, function(err, result) {
        if (!result) {
            return res.status(200).send({status:false,message:"password is incorrect"})
        }
    });


const userId = studentDetail._id;
const token =  jwt.sign({
userId : userId,
exp : 60 // expiryTime=1 minute
},
"somecomplexstring")
  
return res.status(200).send({status:true,message:"User login successfull",data:{userId,token}})
}

module.exports.login=login;