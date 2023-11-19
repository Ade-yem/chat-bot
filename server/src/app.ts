import express from 'express';
import { config } from 'dotenv';
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cors from "cors";

config();
const app = express()


app.use(express.json());
app.use(cors({origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser(process.env.SECRET_KEY));
app.use(morgan("dev"));
app.use('/api/v1/', appRouter)
app.get('/', (req, res, next) => {
  console.log(req.body.name)
  res.send(`Hello ${req.body.name}!`);
});

export default app;