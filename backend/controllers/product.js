import Product from "../models/product.js";

//add new product

export const addProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.send({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//get all products

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    res.send({
      success: true,
      products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
