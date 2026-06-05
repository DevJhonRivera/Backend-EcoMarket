import mongoose from 'mongoose';
import { MONGO_URL } from './config.js';

console.log("MONGO_URL existe:", !!MONGO_URL);

(async () => {
  try {

    mongoose.set("strictQuery", false);

    console.log("Intentando conectar a Mongo...");

    const db = await mongoose.connect(MONGO_URL);

    console.log(
      `BASE DE DATOS CONECTADA ${db.connection.name}`
    );

  } catch (error) {

    console.error(
      "ERROR CONEXION MONGO:",
      error
    );

  }
})();