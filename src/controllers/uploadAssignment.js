const assignmentModel=require("../models/assignment");
const validator=require("../validations/validator")

const assignment=async function(req,res){

    let files = req.files;
    if (!(files && files.length > 0)) {
        return res
        .status(400)
        .send({ status: false, message: "assignment image is required" });
    }

let students=req.body.students;

if(!Array.isArray(students)) return res.status(400).send({status:false,message:"students must be an array"});

students.forEach(function(student){
if(!validator.isValidObjectId(student)) return res.status(400).send({status:false,message:"not a valid object id"});
})

if(!validator.isValidName(assignment)) return res.status(400).send({status:false,message:"not a valid assignment name"});

let assignmentImage = await uploadFile(files[0]);

let recordInserted=await assignmentModel.create({students:students,assignment:assignmentImage})

if(recordInserted) return res.status(201).send({status:true,msg:recordInserted});

}

module.exports.assignment=assignment;