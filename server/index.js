const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "../", "client")));

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(3000, err => {
  if (err) throw new Error("could not connect");
  console.log("listening..");
});
