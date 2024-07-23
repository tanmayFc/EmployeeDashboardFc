import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    pass:{
        type:String
    },
    role:{
        type:String,
        default: 'user'
    }
});

const EmployeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    image:{
        data: Buffer, 
        Type: String 
    }
});

export const UserModel = mongoose.model("UserDB", UserSchema);
export const EmployeeModel = mongoose.model("EmployeeDB", EmployeeSchema);