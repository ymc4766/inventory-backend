import express from "express";
import dotenv from "dotenv";
import { db } from "./db/db.js";

dotenv.config();

import userRoutes from "./routes/userRoutes.js";
import { errorhandler, handleNotFound } from "./utils/errorHandler.js";

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down due to uncaught expection");
  process.exit(1);
});

const app = express();

db();

app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/*", handleNotFound);

app.use(errorhandler);

app.get("/", (req, res) => {
  res.send(`<h1>Hi There Welcome to the COURSE .. :)</h1>`);
});

// console.log(4 * 4, "", 9 + 9);

app.listen(5000, console.log(`app is running on port ${5000}`));

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
