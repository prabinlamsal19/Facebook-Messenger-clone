const express=require("express");
const app=express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan= require("morgan");
const userRoute=require("./routes/users");
const authRoute=require("./routes/auth");
const cors = require("cors");
// const postRoute = require("./routes/posts");


dotenv.config();
mongoose.set('strictQuery', true);

mongoose.connect(
    process.env.MONGO_URL,
    {useNewUrlParser:true, useUnifiedTopology:true},()=>{ 
    console.log("Connected to MONGODB");
});


//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
// app.use(morgan('combined'));
app.use(morgan("common"));

app.use("/api/users" , userRoute)  //runs router userRoute when we go to /api/user
app.use("/api/auth" , authRoute)  //runs router userRoute when we go to /api/auth
// app.use("/api/posts" , postRoute)//runs router postRoute when we go to /api/posts

 
app.listen(8800,()=>{ 
    console.log("Backend server is running at port 8800");
});   