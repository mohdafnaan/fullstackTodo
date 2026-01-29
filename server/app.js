import express from 'express';
import dotenv from "dotenv";
dotenv.config();

// import database 
import "./utils/dbConnect.js"
//import todorouter
import todoRouter from './controllers/index.js';

const app = express();
app.use(express.json())
const port = process.env.PORT;

app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg : "server is runnning"})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
app.use("/todo",todoRouter)
app.listen(port,()=>{
    console.log(`server is running at http://localhost:5000`)
})

