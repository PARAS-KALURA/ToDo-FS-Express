const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo_app",
  password: "your_password",
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
res.send("ToDO API is running");
});

app.listen(PORT, () => {
console.log(`Server ${PORT} is runnnnnning`);
    
});