import express from 'express';
import path from 'path'
const app = express();
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import router from './routes/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import http from 'http'



dotenv.config();
app.use(cors(
  {
<<<<<<< HEAD
      origin: ["http://localhost:3000"],
=======
      origin:  ["http://localhost:3000"],
>>>>>>> 02498a09f468381e0a3543a5984cb09cd56936e5
      credentials: true
  }
));
app.use(express.json())

const PORT = process.env.PORT || 4000



//routes
app.get("/", (req, res) => {
  res.json("Hello");
})
app.use('/api', router)


mongoose.connect('mongodb+srv://lakshya:lakshya@cluster0.nqysbfw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');


mongoose.connection.on('error',err=>{
  console.log('connection failed');
});

mongoose.connection.on('connected',()=>{
  console.log('connected successfully with database');
});

const server = http.createServer(app);
server.listen(PORT,()=>{console.log('this app is running on '+PORT)});
