const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db"); // your pg connection

router.post("/signup", async (req, res) => {

 const { email, password } = req.body; 

 try {
    
    //check user

    const user = await pool.query(
        "SELECT * FROM users WHERE emial = $1",
        [email]
    )

 } catch(err) {
 res.status(500).json("err.message")
 }

});