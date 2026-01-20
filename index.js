// Import and SetUp
const express = require("express");
const {Pool} = require("pg");//  bridge bw node.js and my DB

const app = express();
const PORT = 3000;

// DB connection

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo_app",
  password: "Paras@2003",
  port: "5432",
})