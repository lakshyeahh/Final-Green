import mongoose from 'mongoose';
const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 4000;


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
