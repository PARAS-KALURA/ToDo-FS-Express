const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo_app",
  password: "Paras@2003",
  port: 5432,
});



// this is middleware- which will help to read json body
app.use(express.json());


app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/", (req, res) => {
res.send("ToDO API is runnnning");
});

// Add a todo
app.post("/todos", async (req, res) => {
  try {
    const { title } = req.body;

    const result = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING *",
      [title]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const result = await pool.query(
      "UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *",
      [title, completed, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM todos WHERE id = $1", [id]);

    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
console.log(`Server ${PORT} is runnnnnning`);
    
});