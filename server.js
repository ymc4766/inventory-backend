import express from "express";
import dotenv from "dotenv";
import { db } from "./db/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import { errorhandler, handleNotFound } from "./utils/errorHandler.js";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down due to uncaught expection");
  process.exit(1);
});

const app = express();

db();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use("/*", handleNotFound);

app.use(errorhandler);

app.get("/", (req, res) => {
  res.send(`<h1>Hi There Welcome to the COURSE .. :)</h1>`);
});

// console.log(4 * 4, "", 9 + 9);

app.listen(5000, console.log(`app is running on port ${5000}`));
