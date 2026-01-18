const express = require('express');

const app = express();
const PORT = 3000;

// this is middleware- which will help to read json body
app.use(express.json());

app.get("/", (req, res) => {
    res.send("ToDO API is running");
});

app.listen(PORT, () => {
console.log(`Server ${PORT} is runnnnnning`);
    
});
