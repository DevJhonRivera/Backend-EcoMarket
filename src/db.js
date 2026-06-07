import mongoose from "mongoose"
import { MONGO_URL } from "./config.js";


// Conexión a la base de datos
(async()=>{
    try {
        mongoose.set("strictQuery", false);
        const db = await mongoose.connect(MONGO_URL)
        console.log(`Conectado a ${db.connection.name}`)
    } catch (error) {
        console.log(error)  
    }
})()