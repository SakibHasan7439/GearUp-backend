import express, { Application, Request, Response } from "express";
import cors from 'cors';
import config from "./config";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import { userRoute } from "./modules/users/user.route";
import { categoryRoute } from "./modules/category/category.route";

const app : Application = express();

app.use(cors({
    origin: config.appUrl,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", async(req:Request, res:Response) => {
    res.send("Hello prisma");
})


app.use("/api/auth", userRoute);

app.use("/api", categoryRoute);



app.use(notFound);
app.use(globalErrorHandler);

export default app;