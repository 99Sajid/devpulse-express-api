import express, { type Application, type Request, type Response } from 'express'
import {userRoute } from './modules/user/user.route';
import { issueRoute } from './modules/issues/issue.route';
import { authRoute } from './modules/auth/auth.route';
import logger from './middleware/logger';
import cookieparser from "cookie-parser";
import cors from "cors";

const app : Application = express()
app.use(express.json()) // for parsing application/json
app.use(express.text()) // for parsing text/plain
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.raw()) // for parsing application/octet-stream
app.use(cookieparser());
const corsOptions = {
  origin: 'http://localhost:8000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies to be sent with requests
};
app.use(cors(corsOptions));

app.use(logger);
app.get('/', (req : Request, res : Response)=>{
  //res.send('Hello World!');
  res.status(200).json({
    "message": "Express js",
    "author": "Sajid Rahman",
  })
});

app.use('/api/users',userRoute);
app.use('/api/issues',issueRoute);
app.use("/api/auth",authRoute);

app.use();

export default app;