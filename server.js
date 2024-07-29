import express from "express";
import dotenv from "dotenv";
import { db } from "./db/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, routeNotFound } from "./utils/errorHandler.js";

// console.log(process.env.MONGO_URI);
db();

app.get("/", (req, res) => {
  res.send(`<h1>WELCOME TO NODE JS </h1>`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/users", userRoutes);

app.use("/*", routeNotFound);
app.use(errorHandler);

// console.log(5 + 6, "", 6 * 6);

app.listen(port, console.log(`app is running port  ${port}`));
