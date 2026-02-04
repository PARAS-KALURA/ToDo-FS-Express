const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db"); // your pg connection

router.post("/signup", async (req, res) => {

 const { email, password } = req.body; 

 try {
    
    //check user
    const user = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    //If we found a user… STOP the signup
    if(user.rows.length > 0) {
        return res.status(400).json("User already exits");
    }

 } catch(err) {
 res.status(500).json("err.message")
 }

});