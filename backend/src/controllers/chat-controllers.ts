import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import OpenAI from "openai";


export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    
    const { message } = req.body;
    
    try {
      const user = await User.findById(res.locals.jwtData.id);
      
      if (!user)
        return res
          .status(401)
          .json({ message: "User not registered OR Token malfunctioned" });
      // grab chats of user

      const chats = user.chats.map(({ role, content }) => ({
        role,
        content,
      })) as ChatCompletionRequestMessage[];
      

      chats.push({  role: "user",content: message });
      user.chats.push({  role: "user",content: message });
      ;
      // send all chats with new one to openAI API
      const config = configureOpenAI();
      const openai = new OpenAIApi(config);
      
      // get latest response
      const chatResponse = await openai.createChatCompletion({model:"gpt-4", messages:chats})
    

      console.log(chatResponse.data.choices[0].message);
      console.log(chatResponse.data.model);
     
      user.chats.push(chatResponse.data.choices[0].message);
      
      await user.save();
      return res.status(200).json({ chats: user.chats });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  export const sendChatsToUser = async (
    req:Request, 
    res:Response, 
    next:NextFunction
    ) =>{
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered or token malfunctioned");
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        };

        return res.status(200).json({message: "OK", chats:user.chats});
         
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR", cause: error.message});
    }
}
  export const deleteChats = async (
    req:Request, 
    res:Response, 
    next:NextFunction
    ) =>{
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered or token malfunctioned");
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        };
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({message: "OK"});
         
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR", cause: error.message});
    }
}


/*
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  const MAX_RETRIES = 5; // Maximum number of retries
      let attempt = 0;
      let success = false;
      let chatResponse;

while (attempt < MAX_RETRIES && !success) {
    try {
        chatResponse = await openai.createChatCompletion({
            model: "gpt-4",
            messages: chats,
        });
        success = true; // If request is successful, set success to true
    } catch (error) {
        if (error.response && error.response.status === 429) {
            // If rate limit error, wait and then retry
            attempt++;
            const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
            console.log(`Rate limit reached, retrying in ${waitTime / 1000} seconds...`);
            await delay(waitTime);
        } else {
            // If a different error, throw it
            throw error;
        }
    }
}*/