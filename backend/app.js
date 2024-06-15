import express from 'express';
const app = express();
import router from './routes/index.js';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';




mongoose.connect('mongodb+srv://lakshya:lakshya@cluster0.nqysbfw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
mongoose.connection.on('error',err=>{
  console.log('connection failed');
});
mongoose.connection.on('connected',()=>{
  console.log('connected successfully with database');
});



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.get("*", (req, res,next) => {
  res.status(200).json({
    message: "Hello"
  })
})

app.use('/api', router)

export default app;