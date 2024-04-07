import express from "express";
import { authVerification } from "../middleware/authVerification.js";
import {
  addProduct,
  editProduct,
  getProducts,
  deleteProduct,
  uploadImages,
  updateStatus,
  getProduct,
} from "../controllers/product.js";
import multer from "multer";
const router = express.Router();

router.post("/add-product", authVerification, addProduct);
router.post("/get-products", getProducts);
router.put("/editProduct/:id", editProduct);
router.delete("/deleteProduct/:id", authVerification, deleteProduct);

//handle image upload

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

router.post(
  "/uploadImage",
  authVerification,
  multer({ storage: storage }).single("file"),
  uploadImages
);

// update product status

router.put("/updateProductStatus/:id", authVerification, updateStatus);
router.get("/getProduct/:id", getProduct);

export default router;
