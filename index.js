const express = require("express");
const {Pool} = require("pg");
const cors = require("cors");

const PORT = 3000;

const app = express();

app.use(cors()); // allows frontend (React) to talk to backend
app.use(express.json()); // allows reading req.body

const pool = new Pool({
 user: 'postgres',
 password: "Paras@2003",
 host: "localhost",
 port: 5432,
 database: "todoDB",

})



// create a new todo
// This is an Express API route that receives todo data from React, saves it in the database, and sends the saved todo back.
app.post("/todos", async (req, res) => {
  try {
    const { description, completed } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todo (description, completed) VALUES ($1, $2) RETURNING *",
      [description, completed || false]
    );

    res.json(newTodo.rows[0]); // The database gives data to Express, and Express sends it to React as JSON.
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); 
  }
});


//get all todo
app.get("/", async (req, res) => {
  try {
     const allTodos = await pool.query("SELECT * FROM todo")
     res.json(allTodos.rows)
  } catch(error){
    res.status(500).send("Server Error");
  }
} )

//update a todo
app.put("/todos/:id", async (req, res) => {
  
  const {id} = req.params;
  const {description, completed} = req.body;

  try {
    
   const result = await pool.query(
    "UPDATE todo SET description=$1, completed=$2 WHERE todo_id=$3 RETURNING *",
    [description, completed, id]
  );

  res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error")
  }
} )


//delete
app.delete("/todos/:id", async(req,res) => {
  try {
    const {id} = req.params;
    
    await pool.query("DELETE from todo WHERE todo_id = $1", 
      [id]);
    

    res.json({message:"Delted Successfully"})

  } catch(err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
} )


app.listen(PORT, () => {
  console.log(`Server ${PORT} is running`);
  
})