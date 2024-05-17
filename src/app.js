// Initialize express app
const express = require("express");
require("dotenv").config();
const envConstants = require("./configs/constants");
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

const PORT = envConstants.PORT || 3936;

//connect to database
mongoose
  .connect(envConstants.MONGO_URI)
  .then((data) => {
    console.log("Database Conection Sucessful");
    app.listen(PORT, () => {
      console.log(`Server is currently running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
