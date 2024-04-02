import express from "express";
import { authVerification } from "../middleware/authVerification.js";
import { addProduct, getProducts } from "../controllers/product.js";
const router = express.Router();

router.post("/add-product", authVerification, addProduct);
router.get("/get-products", getProducts);
export default router;
