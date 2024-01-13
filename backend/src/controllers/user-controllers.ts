import { Request, Response, NextFunction } from "express";
import User from "../models/User.js"
import {hash, compare} from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
import { clearAndCreateCookie, clearCookie, createCookie } from "../utils/cookie-manager.js";
import { clear } from "console";

export const getAllUsers = async (
    req:Request, 
    res:Response, 
    next:NextFunction
    ) =>{
    try {
        //get all users from db
        const users = await User.find();
        return res.status(200).json({message: "OK", users});
    }
     catch (error) {
        console.log(error);
        return res.status(404).json({message: "ERROR", cause: error.message});
    }
}


export const userSignup = async (
    req:Request, 
    res:Response, 
    next:NextFunction
    ) =>{
    try {
        //get all users from db
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email: email});
        if(existingUser) return res.status(401).send("User already registered");
        const hashedPassword = await hash(password, 10);
        const user = new User({name: name, email: email, password: hashedPassword});
        await user.save();
        
        clearAndCreateCookie(res, user);

        return res.status(201).json({message: "OK", name:user.name, email:user.email});
    }
     catch (error) {
        console.log(error);
        return res.status(404).json({message: "ERROR", cause: error.message});
    }
}

export const userLogin = async (
    req:Request, 
    res:Response, 
    next:NextFunction
    ) =>{
    try {
        //get all users from db
        const {email, password} = req.body;
        //find specific user by email, which are unique per the valiation rules
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(401).send("User doesn't exist.");
        }

        const isPasswordCorrect = await compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(403).send("Password is incorrect");
        }
        //Create a cookie & JWT token
        clearAndCreateCookie(res, user);

        return res.status(200).json({message: "OK w/cookie", name:user.name, email:user.email});
         
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR", cause: error.message});
    }
}
export const userLogout = async (
    req:Request, 
    res:Response, 
    next:NextFunction
    ) =>{
    try {
        //get all users from db
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered or token malfunctioned");
        }

        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        };
        clearCookie(res);

        return res.status(200).json({message: "OK w/cookie"});
         
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR", cause: error.message});
    }
}
export const verifyUser = async (
    req:Request, 
    res:Response, 
    next:NextFunction
    ) =>{
    try {
        //get all users from db
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered or token malfunctioned");
        }

        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        };

        return res.status(200).json({message: "OK w/cookie", name:user.name, email:user.email});
         
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR", cause: error.message});
    }
}


