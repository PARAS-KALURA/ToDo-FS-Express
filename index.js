const express = require("express");
const {Pool} = require("pg");

const PORT = 3000;

const app = express();

const pool = new Pool({
 user: 'postgres',
 password: "Paras@2003",
 host: "localhost",
 port: 5432,
 database: "todo_db",

})

app.get("/", (req,res) => {
  res.send("Hey there");
});


// create a new todo
// This is an Express API route that receives todo data from React, saves it in the database, and sends the saved todo back.
app.post("/", async (req, res) => {
  try {
    const { description, completed } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todo (description, completed) VALUES ($1, $2) RETURNING *",
      [description, completed || false]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



app.listen(PORT, () => {
  console.log(`Server ${PORT} is running`);
  
})