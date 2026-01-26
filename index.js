const express = require('express');
const app = express();
const PORT = 3000;

app.get(express.json());

app.get("/", (req, res) => {
  res.json([
   {id: 1,title: "PDF", completed: "true" },
   {id: 2, title: "Destructing", completed: "false"}, 
  ])
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} is running`);
});