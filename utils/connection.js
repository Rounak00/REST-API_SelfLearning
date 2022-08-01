import { DB_URL } from "../config/index.js";
import mongoose from "mongoose";


const connection = async() => {
    try{
        await mongoose.connect(DB_URL);
        console.log("DB Connected...");
    }catch(err){
        console.log("Error on connection", err.message);
    }
}

export default connection