import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/user.js";
import productsRoutes from "./routes/products.js";
const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);
app.listen(port, () => console.log(`Server is running on port${port}`));
