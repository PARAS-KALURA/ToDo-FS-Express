const express = require('express');
//“From the pg package, take out the tool called Pool that knows how to talk to PostgreSQL.”
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo_app",
  password: "Paras@2003",
  port: "5432",
})

app.use(express.json());

app.get("/db-test", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows[0]);
} )

app.post("/todos", async (req, res) => {
  const {title} = req.body;
  
  const result = await pool.query("INSERT INTO todos (title) VALUES ($1) RETURNING *",
    [title]
  );
  
  res.status(201).json(result.rows[0]);
})

app.delete("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params;

    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    
    res.json({message: "Todo deleted"});
  } catch(error) {
    res.json(500).json({error: error.message});
  }
} ) 


app.get("/todos", async (req, res) => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
  res.json(result.rows);
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} is runnnnnnnnnnning`);
});