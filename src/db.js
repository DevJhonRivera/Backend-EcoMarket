import mongoose from "mongoose"
import { MONGO_URL } from "./config.js";

(async()=>{
    try {
        mongoose.set("strictQuery", false);
        console.log("Mongo URL",MONGO_URL)
        const db = await mongoose.connect(MONGO_URL)
        console.log(`Conectado a ${db.connection.name}`)
    } catch (error) {
        console.log(error)  
    }
})()