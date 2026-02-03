const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const PORT = 3000;

app.use(cookieParser());

app.get("/", function (req, res) {
 res.cookie("name", "Kalura");
 res.send("done");
});

app.get("/read", function (req, res) {
    console.log(req.cookies);
 res.send("read page");
});


app.listen(PORT, () => {
    console.log(`Server ${PORT} is running`);
})

