import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send(`<h1>Hi THERE  WELCOME TO COURSE</h1>`);
});

console.log(4 * 4, "", 9 + 9);

app.listen(5000, console.log(`app is running on port ${5000}`));
