// Initialize express app
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  return res.status(200).json({ message: "Welcome to the library api" });
});

app.use("*", (req, res) => {
  return res.status(404).json({ error: "Route not found", statusText: "fail" });
});
