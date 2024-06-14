import express from 'express';
const app = express();
import router from './routes/index.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


mongoose.connect('mongodb+srv://lakshya:lakshya@cluster0.nqysbfw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{useNewUrlParser:true, useUnifiedTopology: true});
mongoose.connection.on('error',err=>{
  console.log('connection failed');
});
mongoose.connection.on('connected',()=>{
  console.log('connected successfully with database');
});

dotenv.config();

app.use(express.json())

app.use(cors({
  origin: ["https://green-project-haii-qk52js99v-lakshyeahhs-projects.vercel.app"],
  methods: ["POST", "GET", "PUT", "PATCH", 'DELETE'],
  credentials: true
}));

app.get("*", (req, res,next) => {
  res.status(200).json({
    message: "Hello"
  })
})

app.use('/api', router)

export default app;
