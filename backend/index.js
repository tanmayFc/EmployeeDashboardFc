import nodemon from "nodemon";
import express from "express";
import cors from "cors";
import connectToDb from "./connection.js";
import router from "./routes/route.js";
import bodyParser from "body-parser";


const server = express();
const port = 3001;

// middlewares
server.use(express.json());
server.use(cors());

// connection
connectToDb("mongodb://127.0.0.1:27017/DashDB");

// Router
server.use("/", router);

server.listen(port,()=>console.log('server started'));




