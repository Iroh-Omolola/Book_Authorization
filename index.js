import express from 'express';
import UserRouter from './routes/auth.js';
import postRouter from './routes/root.js'


import databaseConnection from './database/index.js';


databaseConnection.getConnect();
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes middlewares
app.use('/api/user', UserRouter);
app.use('/api/post', postRouter);

app.listen(port, () => {
    console.log(`Server connected at  http://localhost:${port}`);
  });