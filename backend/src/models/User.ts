import mongoose from "mongoose";
import {Types} from 'mongoose';
import {randomUUID} from 'crypto';


export interface IChat {
    id?: string;  // Optional because of the default value
    role: string;
    content: string;
}

const chatSchema = new mongoose.Schema<IChat>({
    id: {
        type:String,
        default: randomUUID(),
    },
    role:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    }
});

export interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    chats: IChat[];  // Array of chat documents
}

const userSchema = new mongoose.Schema<IUser>({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    chats: [chatSchema],
});

export default mongoose.model<IUser>("User", userSchema);