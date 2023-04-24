const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const app = express();
const multer = require("multer")
const { AppConfig } = require('aws-sdk');
require("dotenv").config();
const fs=require("fs");
const path=require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())
const fileUpload=require("express-fileupload");
///////////////// [ MONGO-DB CONNECTION ] /////////////////
mongoose.connect("mongodb+srv://Takkupulto22:Takkupulto22@cluster0.48uam.mongodb.net/student", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

///////////////// [ ROOT API ] /////////////////
app.use('/', route)

app.use(fileUpload());

///////////////// [ SERVER CONNECTION ] /////////////////
app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});