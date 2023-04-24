const studentDetailsModel=require("../models/studentDetails");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto=require("crypto");
const validator=require("../validations/validator")
const formidable=require("formidable");


const studentRegistration=async function(req,res){
try{
let firstName=res.locals.firstName;
let lastName=res.locals.lastName;
let email=res.locals.email;
let password=res.locals.password;
let mobile=res.locals.mobile;
let ivFromMiddleware=res.locals.iv;
let keyFromMiddleware=res.locals.key;
let algorithm=res.locals.algorithm;
let fileName=res.locals.fileName;
let files=res.locals.files;


let iv = Buffer.from(ivFromMiddleware, 'hex')
let key = Buffer.from(keyFromMiddleware, 'hex');
mobile = Buffer.from(mobile, 'hex');
email = Buffer.from(email, 'hex');
password = Buffer.from(password, 'hex');



let decipher1 = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
let decryptedEmail = decipher1.update(email);
decryptedEmail = Buffer.concat([decryptedEmail, decipher1.final()]);
decryptedEmail = decryptedEmail.toString();


let decipher2 = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
let decryptedPassword = decipher2.update(password);
decryptedPassword = Buffer.concat([decryptedPassword, decipher2.final()]);

let decipher3 = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
let decryptedMobile = decipher3.update(mobile);
decryptedMobile = Buffer.concat([decryptedMobile, decipher3.final()]);
decryptedMobile = decryptedMobile.toString();


// let decipher4 = crypto.createDechpherIv(algorithm,Buffer.from(key), iv);
// let decryptedFiles = decipher4.update(files);
// decryptedFiles = Buffer.concat([decryptedFiles,decipher4,final()]);
// decryptedFiles = decryptedFiles.toString();
// let profileImage = decryptedFiles;

console.log("consoling processed items: -");
console.log(decryptedMobile);
console.log(decryptedEmail);
console.log(decryptedPassword);
// console.log(profileImage);

if (!validator.isValidValue(firstName)) return res.status(400).send({ status: false, message: "Please provide First name" });

if(!validator.isValidName(firstName)) return res.status(400).send({ status: false, message: "Please provide valid First name" });      

if (!validator.isValidValue(lastName)) return res.status(400).send({ status: false, message: "Please provide Last name" });

if(!validator.isValidName(lastName)) return res.status(400).send({ status: false, message: "Please provide valid Last name" });       

if(!validator.isValidValue(decryptedEmail)) return res.status(400).send({ status: false, message: "Please provide Email" });

if(!validator.isValidEmail(decryptedEmail)){
    console.log(email);
    return res.status(400).send({ status: false, message: "Please provide valid Email Address" });
}


let isDuplicateEmail = await studentDetailsModel.findOne({ email:decryptedEmail });
if (isDuplicateEmail) return res.status(409).send({ status: false, message: "email already exists" });


if (!validator.isValidValue(decryptedPassword)) return res .status(400).send({ status: false, messege: "Please provide password" });


if (!validator.isValidValue(decryptedMobile)) return res.status(400).send({ status: false, messege: "Please provide mobile number" });


if (!validator.isValidPhone(decryptedMobile)) return res.status(400).send({ status: false, message: "Please provide valid mobile number" });


let isDuplicatePhone = await studentDetailsModel.findOne({mobile:decryptedMobile });
if (isDuplicatePhone) return res.status(409).send({ status: false, message: "mobile no. already exists" });




const salt = await bcrypt.genSalt(10);
let hashedPassword = await bcrypt.hash(decryptedPassword, salt);



const newUser = await studentDetailsModel.create({firstName:firstName,lastName:lastName,email:decryptedEmail,mobile:decryptedMobile,password:hashedPassword});


return res.status(201).send({ status: true, message: "Success", data: newUser });
}catch(error){
    return res.status(500).send({status:false,msg:error.message});
}

}

module.exports.studentRegistration=studentRegistration;