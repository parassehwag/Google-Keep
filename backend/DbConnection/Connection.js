import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function Connection(){
    const USERNAME=process.env.DB_USERNAME;
    const PASSWORD=process.env.DB_PASSWORD;
    const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.wemydzg.mongodb.net/?retryWrites=true&w=majority`

    try{
        await mongoose.connect(URL);
        console.group("Database Connected Successfully")
    }
    catch(error){
        console.log("Error While Connecting With The Database :",error);
    }
}

export default Connection;