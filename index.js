const express = require('express');
const {Pool} = require("pg");

const app = express();
const PORT = 3000;

const pool = new Pool ({
  user: "postgres",
  host: "localhost",
  database: "todo_app",
  password: "Paras@2003",
  port: "5432",
})

app.get(express.json());

app.get("/", (req, res) => {
  res.json([
   {id: 1,title: "PDF", completed: "true" },
   {id: 2, title: "Destructing", completed: "false"}, 
  ])
});


app.listen(PORT, () => {
  console.log(`Server ${PORT} is runnnning`);
});