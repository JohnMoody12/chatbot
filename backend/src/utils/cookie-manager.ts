import {Response} from 'express';
import { COOKIE_NAME } from './constants.js';
import { createToken } from './token-manager.js';
import { IUser } from '../models/User.js';

export const clearCookie = (res: Response) =>{
    res.clearCookie(COOKIE_NAME,{
        path: "/", 
        domain: "localhost", 
        httpOnly: true,
        signed: true,
        

    })
}

export const createCookie = (res: Response, token, expires) =>{
    res.cookie(COOKIE_NAME, token, {
        path: "/", 
        domain: "localhost", 
        expires: expires, 
        httpOnly: true,
        signed: true,
        
    })
}

export const clearAndCreateCookie = (res: Response, user: IUser) =>{
    
    res.clearCookie(COOKIE_NAME,{
        path: "/", 
        domain: "localhost", 
        httpOnly: true,
        signed: true,
    })

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(COOKIE_NAME, token, {
        path: "/", 
        domain: "localhost", 
        expires: expires, 
        httpOnly: true,
        signed: true,
        
    })
}