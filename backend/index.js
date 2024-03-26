import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();

const port = process.env.PORT || 8080;

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server is running on port${port}`));
