import express from 'express';
import mongoose from 'mongoose';
import { MONGO_URL, PORT } from './config.js';

const app = express();

app.get('/', (req, res) => {
  res.send(JSON.stringify({ message: 'Hello World!' }));
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error.message);
  });
