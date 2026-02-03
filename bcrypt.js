const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const PORT  = 5000;

app.get("/", async (req, res) => {
    const hash = await bcrypt.hash("pololololo", 10);
    console.log(hash);
    res.send("hi");
});


app.listen(PORT, () => {
    console.log(`${PORT} is running`);

})