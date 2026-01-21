// Import and SetUp
const express = require("express");
const {Pool} = require("pg");//  bridge bw node.js and my DB //  Bring me the tool (blueprint) that knows how to talk to PostgreSQL

const app = express();
const PORT = 3000;


// DB connection - This creates a permanent connection manager.
const pool = new Pool({   // “Use that tool to create a real working connection to my database.
  user: "postgres",
  host: "localhost",
  database: "todo_app",
  password: "Paras@2003",
  port: "5432",
})


// middleware - If someone sends JSON data to my server, read it and make it usable for me.        
// Middleware runs on every incoming request and prepares it, like parsing the data, so Express (and your database logic) can understand and use it.
app.use(express.json()); 



app.get("/db-test", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows[0]);
} )


