const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const assignmentSchema = new mongoose.Schema(
{
students:[{studentId:{type:ObjectId,ref:'studentDetails',required:true,unique:true}}],
assignment:{type:String,required:true,unique:true,trim:true}
},
{timestamps:true}
)

module.exports=mongoose.model('assignment',assignmentSchema)
