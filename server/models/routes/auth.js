//Sign Up route
// SIGNUP → Create Identity

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

    //hash
    const saltRounds = 10; //Think of it like locking a door.
    const hashedPassword = await bcrypt.hash(password, saltRounds); //Take the user's password and convert it into a secure unreadable string.
    //Salt = random data added before hashing.

    //insert
    await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2)',
        [email, hashedPassword]
    );

    res.json("User Registered!");
    

 } catch(err) {
 res.status(500).json("err.message")
 }

});


// Logic Route
// LOGIN → Verify Identity

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    try {

      const user = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if(user.rows.length === 0) {
        return res.status(400).json("Invalid credentails");
      }

      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );

      if(!validPassword) {
        return res.status(400).json("Invalid credentails");
      }

      res.json("LOGIN SUCCESS");

    } catch(err) {
        res.status(500).json("err.message");
    }

});