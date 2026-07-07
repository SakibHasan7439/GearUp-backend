import express, { Application, Request, Response } from "express";
import cors from 'cors';
import config from "./config";
import cookieParser from "cookie-parser";

const app : Application = express();

app.use(cors({
    origin: config.appUrl,
    credentials: true
}));

app.use(express());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", async(req:Request, res:Response) => {
    res.send("Hello prisma");
})


export default app;