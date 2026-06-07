import mongoose from "mongoose"
import { MONGO_URL } from "./config.js";

      // Eventos de monitoreo
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB conectado");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("❌ MongoDB desconectado");
    });

    mongoose.connection.on("error", (err) => {
      console.error("🔥 Error MongoDB:", err);
    });

// Conexión a la base de datos
(async () => {
  try {
    mongoose.set("strictQuery", false);

    const db = await mongoose.connect(MONGO_URL,{
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS:45000
    });
    console.log(`Conectado a ${db.connection.name}`);


  } catch (error) {
    console.error("Error MongoDB:");
    console.error(error.message);
    console.error(error);
  }
})();