import express from "express";
import { authVerification } from "../middleware/authVerification.js";
import {
  addProduct,
  editProduct,
  getProducts,
  deleteProduct,
} from "../controllers/product.js";
const router = express.Router();

router.post("/add-product", authVerification, addProduct);
router.get("/get-products", getProducts);
router.put("/editProduct/:id", editProduct);
router.delete("/deleteProduct/:id", authVerification, deleteProduct);
export default router;
