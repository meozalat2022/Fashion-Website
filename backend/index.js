import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./routes/user.js";
import productsRoutes from "./routes/products.js";
import bidsRoutes from "./routes/bid.js";
import notificationsRoutes from "./routes/notification.js";
const app = express();
app.use(express.json());
// const port = process.env.PORT || 8080;
const __dirname = path.resolve();

// pre deployment

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get((req, res, next) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));
app.listen(8080, () => console.log(`Server is running on port`));

app.use("/api/bids", bidsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/notifications", notificationsRoutes);
