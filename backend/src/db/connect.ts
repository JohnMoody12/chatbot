import {connect, disconnect} from 'mongoose';

async function connectToDatabase(){
    try {
        await connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB Successfully");
    } catch (error) {
        console.log("Did not connect to MongoDB Successfully");
        throw new Error("Cannot connect to MongoDB")
    }
    
}

async function disconnectFromDatabase(){
    try {
        await disconnect();
    } catch (error) {
        throw new Error("Cannot disconnect from MongoDB")
    }
    
}

export {connectToDatabase, disconnectFromDatabase}