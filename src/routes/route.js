const express = require('express');
const router = express.Router();

const studentRegistrationController=require("../controllers/studentRegistration");
const studentLoginController=require("../controllers/studentLogin");
const uploadAssignmentController=require("../controllers/uploadAssignment");
const middleware=require("../middlewares/auth");
//........................................

const multer=require("multer");
const upload = multer({
    storage:multer.diskStorage({
        destination: (req, file, callback) => {
            console.log("hello")
            callback(null, 'uploads')
        },

        filename: (request, file, callback) => {
            console.log(file);
            // or 
            // uuid, or fieldname
            callback(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname));
        }

    })

}).single("sampleFile");


//trying to use this to add image of the student but it is not working
// router.post("/studentRegistration",middleware.securingData,upload, studentRegistrationController.studentRegistration)

router.post("/studentRegistration",middleware.securingData, studentRegistrationController.studentRegistration);
router.post("/studentLogin",studentLoginController.login);

router.post("studentAssignment",uploadAssignmentController.assignment);


module.exports=router;
