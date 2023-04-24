const mongoose=require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId

const studentSchema = new mongoose.Schema(
    {
    
    firstName:{type:String,required:true,trim:true},
    lastName:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,trim:true},
    mobile:{type:String,required:true,unique:true,trim:true},
    password:{type:String,required:true,unique:true,trim:true},
    profileImage:{type:String,required:false,unique:true,trim:true}
    },
    {timestamps:true}
    )
    
    module.exports = mongoose.model("StudentDetails", studentSchema);