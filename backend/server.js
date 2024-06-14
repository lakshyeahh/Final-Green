import express from 'express';
import path from 'path'
const app = express();
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import router from './routes/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'



dotenv.config();
app.use(cors(
  {
      origin: ["https://deploy-mern-frontend.vercel.app"],
      methods: ["POST", "GET", "PUT", "PATCH", 'DELETE'],
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


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(PORT, () => {
      console.log('listening for requests on port', PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 