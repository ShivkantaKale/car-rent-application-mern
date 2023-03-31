// import express from "express";
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const dbConnection = require("./db");

app.get("/", (rep, res) => res.send("Hello World"));
app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`));

//Globally index.js is replaced for server.js&db.js
