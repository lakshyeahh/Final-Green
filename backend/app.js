import express from 'express';
const app = express();
import router from './routes/index.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';

dotenv.config();

app.use(express.json())

app.use(cors());

app.get("*", (req, res,next) => {
  res.status(200).json({
    message: "Hello"
  })
})

app.use('/api', router)

export default app;
