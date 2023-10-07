// import express from 'express';
// import chalk from 'chalk';
// import cors from 'cors';
// import logger from 'morgan';
import cookieParser from 'cookie-parser';
// import authRoutes from './routes/auth.js';
// import carSaleRoutes from './routes/carSale.js';
import mongooseConnection from './db/connection.js';

// const app = express();
// // const PORT = process.env.PORT || 
// const PORT = 8000;

// mongooseConnection.on('connected', () => {
//   console.log(chalk.blue('Connected to database!'));
// });

// mongooseConnection.on('disconnected', () => {
//   console.log('Disconnected from database!');
// });

// mongooseConnection.on('error', (error) => {
//   console.log('Error connecting to database! Look out for:', error);
// });

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: 'http://localhost:3000/auth/signup',
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     exposedHeaders: ['Access-Control-Allow-Origin'],
//   })
// );
// app.use(logger('development'));
// app.use('/auth', authRoutes);
// app.use('/user', carSaleRoutes);

// app.listen(PORT, () => {
//   console.log(`Express server running on port ${PORT}`);
// });


import db from "./db/connection.js";
import authRoutes from './routes/auth.js';
import salePostRoutes from './routes/carSale.js';
import carInfoRoutes from './routes/carInfo.js';
import uploadRoutes from './routes/upload.js';

import path from "path";
import express from "express";
import cors from "cors";
import logger from "morgan";
import chalk from "chalk";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
// app.use(
//       cors({
//         origin: ['http://localhost:3000', 'https://project-3-client.vercel.app/', 'https://project-3-client-git-development-lschmidtfellner.vercel.app/', 'https://project-3-client-jexll19se-lschmidtfellner.vercel.app/', 'https://luke-used-cars-backend-19ea42e37e12.herokuapp.com'],
//         credentials: true,
//         methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//         exposedHeaders: ['Access-Control-Allow-Origin'],
//       }))


// app.use(
//   cors({
//     origin: (origin, callback) => {
//       callback(null, true)
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   })
// )


app.use(logger("dev"));
app.use('/uploads', express.static(path.join('uploads')));

app.use('/auth', authRoutes);
app.use('/api', salePostRoutes);
app.use('/api', carInfoRoutes);
app.use('/api/upload', uploadRoutes);
// app.use('/auth', authRoutes);

db.on("connected", () => {
  console.log(chalk.blue("Connectd to MongoDB!"));
  app.listen(PORT, () => {
    process.env.NODE_ENV === "production"
      ? console.log(`Express server running in production on port ${PORT}\n\n`)
      : console.log(
          `Express server running in development on: http://localhost:${PORT}`
        );
  });
});