import cloudinary from "../config/cloudinaryConfig.js";
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
    const { seller, category = [], age = [], status } = req.body;
    let filters = {};
    if (seller) {
      filters.seller = seller;
    }
    if (status) {
      filters.status = status;
    }

    // get products by category

    if (category.length > 0) {
      filters.category = { $in: category };
    }

    // get products by age

    if (age.length > 0) {
      age.forEach((item) => {
        const fromAge = item.split("-")[0];
        const toAge = item.split("-")[1];
        filters.age = { $gte: fromAge, $lte: toAge };
      });
    }
    const products = await Product.find(filters)
      .populate("seller")
      .sort({ createdAt: -1 });

    res.send({
      success: true,
      data: products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//edit product

export const editProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//delete Product

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export const uploadImages = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Fashion",
    });

    const productId = req.body.productId;

    await Product.findByIdAndUpdate(productId, {
      $push: { images: result.secure_url },
    });
    res.send({
      success: true,
      message: "Images uploaded successfully",
      data: result.secure_url,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//update product status

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { status });
    res.send({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//get single product

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("seller");
    res.send({
      success: true,
      data: product,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
