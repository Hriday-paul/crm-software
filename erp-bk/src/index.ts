import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import router from "./routs";
const app: Express = express();
const port = process.env.PORT || 3000;
import '../src/config/db'
import helmet from 'helmet'
import cors from 'cors'
import xss from 'xss';
import multer from 'multer'
import cookieParser from 'cookie-parser';

multer();
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
// app.use(xss('<script>alert("xss");</script>'));
app.use(express.json());
app.use(cookieParser())
app.use(express.static('public'));
app.use("/api", router);

// default api home rout
app.use((req: Request, res: Response) => {
  res.json({ status: 'connection ok', message: 'api end point not found' }).status(400)
});

// error handling
app.use((err: Error, req: Request, res: Response) => {
  res.send({
    status: 'connection failed',
    message: 'got api error'
  })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
