const express = require("express");
const {Pool} = require("pg");

const PORT = 3000;

const app = express();

app.get("/", (req,res) => {
  res.send("Hey there");
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} is running`);
  
})