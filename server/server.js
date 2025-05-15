import express from "express";
import dotenv from "dotenv";
import countiesRouter from "./routes/countiesRoutes.js";
import soupsRouter from "./routes/soupsRoutes.js";
import tribesRouter from "./routes/tribesRoutes.js";
import cors from "cors";

const env = dotenv.config()
const app = express();

const PORT = process.env.PORT || 4000;

//Middleware 
app.use(cors())
app.use(express.json())

//Routes
app.use('/api', countiesRouter);
app.use('/api', soupsRouter);
app.use('/api', tribesRouter);

app.listen(PORT, ()=>{
    console.log(`Your server is running on Port ${PORT}`)
})
