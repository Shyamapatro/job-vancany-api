import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { connectDB } from './dbConnection.js';  
import { errors } from "celebrate";
import { appConfig } from './app/config/config.js';
import userRoutes from './app/routes/User/user.js';
import jobRoutes from './app/routes/Job/job.js';
import morgan from 'morgan'
import {info} from './app/utils/logger.js'
const app = express();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

// enables Cross-Origin Resource Sharing. It controls which domains are allowed to access
app.use(
    cors({
      origin: [
        appConfig.clientUrl
      ]
    })
  );

app.use(bodyParser.json({ type: 'application/json' }));
// adds various HTTP headers to enhance the security
app.use(helmet());
app.use(morgan("combined"));

// Connect to the database
connectDB(); 

//Routes
app.use('/api/user', userRoutes);
app.use('/api/job', jobRoutes);
app.use(errors());

// Global middleware to handle unknown routes
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Global error handler
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message: message,
  });
  //  avoid "no-unused-vars" warning
   next();
});

app.listen(PORT, () => {
  info(`Server is running on port ${PORT}`);
  info("NODE ENV ---> ",process.env.NODE_ENV);
});

export default app;