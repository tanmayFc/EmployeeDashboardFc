import { UserModel, EmployeeModel } from "../models/model.js";
import jwt from "jsonwebtoken";


export async function handleMounting(req,res){
    const data = await EmployeeModel.find({});
    return res.json(data);
}

export async function handleUserLogin(req,res){ 
        const email = req.body.email;
        const pass = req.body.pass;
        const response = await UserModel.findOne({
            email : email,
            pass : pass
        })
        if(!response){
            return res.json({msg:'user not found'});
        }
        const name = response.name
        const objId = response._id
        const token = jwt.sign({name, email, objId},
            `${process.env.JWT_SECRET_KEY}`,{
                expiresIn: 86400
            });
        return res.json({response, token, msg:'user exists'})

    // return res.json(req.body);
        
    // const { name, email } = req.body;
    // const response = await UserModel.findOne({name,email})
    //     if(!response){
    //         return res.json({msg:'user not found'});
    //     }
    //     const objId = response._id
    //     const token = jwt.sign({name, email, objId},
    //         `${process.env.JWT_SECRET_KEY}`,{
    //             expiresIn: 86400
    //         });
    //     return res.json({response, token, msg:'user exists'})
}

export async function handleUserRegisteration(req,res){
    const { name, email, pass} = req.body;
    const exists = await UserModel.findOne({
        email, pass
    });

    if(exists){
        return res.send({msg: "user exists"})
    }

    const response = await UserModel.create({
        name, email, pass
    });
    const objId = response._id;
    const token = jwt.sign({name, email, objId}, 
        `${process.env.JWT_SECRET_KEY}`, {
        expiresIn : 86400
        });
        console.log(token);
    return res.json({response, token});   
}

export async function handleNextAuthEntry(req,res){
    const nameVal = req.body.name;
    const emailVal = req.body.email;

    const exists = await UserModel.findOne({
        name : nameVal,
        email : emailVal
    });

    if(exists){
        const response = exists;
        const token = jwt.sign({nameVal, emailVal}, 
            `${process.env.JWT_SECRET_KEY}`,{
                expiresIn : 86400
            });
        return res.json({response, token});
    }

    else{
        const randPass = (Math.random()).toString(36).substring(4);
        const response = await UserModel.create({
            name : nameVal,
            email : emailVal,
            pass : randPass
        });

        const token = jwt.sign({nameVal, emailVal},
            `${process.env.JWT_SECRET_KEY}`,{
                expiresIn : 86400
            });
        return res.json(response, token)
    }
}