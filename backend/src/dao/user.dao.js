import User from "../models/user.model.js";

export const findUserByEmail=async(email)=>{
    try {
        return await User.findOne({email});
    } catch (error) {
        if(error.code === 11000){
            throw new Error("User already exists");
        }
        throw error;
    }
}


export const findUserById=async(id)=>{
    try {
        return await User.findById(id);
    } catch (error) {
        if(error.code === 11000){
            throw new Error("User already exists");
        }
        throw error;
    }
}


export const createUser=async(name,email,password)=>{
    try {
        const newUser=new User({
            name,
            email,
            password,
        })
        await newUser.save();
        return newUser;
    } catch (error) {
        if(error.code === 11000){
            throw new Error("User already exists");
        }
        throw error;
    }
}

export const UpdateUser=async(id,update)=>{
    try {
        return await User.findByIdAndUpdate(id,update);
    } catch (error) {
        if(error.code === 11000){
            throw new Error("User already exists");
        }
        throw error;
    }
}

export const deleteUser=async(id)=>{
    try {
        return await User.findByIdAndDelete(id);
    } catch (error) {
        if(error.code === 11000){
            throw new Error("User already exists");
        }
        throw error;
    }
}