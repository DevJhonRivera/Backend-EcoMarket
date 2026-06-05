import express from 'express'
import cors from 'cors'
import morgan from 'morgan';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import User from "./routes/authRoutes.js";
import Products from './routes/productRoutes.js'

const app = express();


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// app.use("/",(req,res)=>{
// res.send("Ruta no encontrada");
// return res.status(404).json({message:"Home"});
// }); 


app.use("/api/auth", User);
app.use("/api/products", Products);
app.use(notFound);
app.use(errorHandler)    

export default app;