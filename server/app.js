import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import cookieParser from "cookie-parser";
import router from "./src/routes/routes.js";
import morgan from "morgan";

dotenv.config({ path: "./src/.env" });
const app = express();
const port = process.env.port || 3000;

app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
connectDB();
app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
