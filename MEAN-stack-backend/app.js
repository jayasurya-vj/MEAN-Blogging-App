import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import {postsRouter} from "./routes/posts.js";
import {userRouter} from "./routes/user.js";


export const app = express();


mongoose.connect("mongodb+srv://jayasurya:"+ process.env.MONGO_PWD +"@cluster0.trotk.mongodb.net/blog-app?retryWrites=true&w=majority")
.then(()=>console.log("connected successfully"))
.catch(()=>console.log("connection failed"));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join("images")));
app.use("/",express.static(path.join("angular")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS,PUT");
  next();
})


app.use("/api/posts",postsRouter);
app.use("/api/user",userRouter);
app.use("",(req,res,next)=>{
  res.sendFile(path.json(__dirname,"angular","index.html"));
});

