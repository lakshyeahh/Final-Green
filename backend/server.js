import express from 'express';
import router from './routes/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: ["https://deploy-mern-frontend.vercel.app"],
  methods: ["POST", "GET", "PUT", "PATCH", 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use('/api', router);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log('Listening for requests on port', PORT);
    });
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });
