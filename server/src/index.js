import express, { urlencoded } from "express";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"


import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import {io, app, server} from "./lib/socket.js"


dotenv.config();


const PORT = process.env.PORT;

app.use(express.json({limit: "10mb"}));
app.use(cookieParser());
app.use(urlencoded({extended:true}))
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);



server.listen(PORT, () => {
    console.log(`App is running on Port: ${PORT}`);
    connectDB()
})