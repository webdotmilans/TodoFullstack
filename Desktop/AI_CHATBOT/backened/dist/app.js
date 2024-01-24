import express from "express";
import { config } from "dotenv";
import morgan from 'morgan';
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
config();
const app = express();
//middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
//remove it in production only use in development mode
app.use(morgan("dev")); // morgan package (npm i morgan )is use give you description that what type of request was handled and what 
//was the response and what was the status code
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map