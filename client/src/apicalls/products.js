import { axiosInstance } from "./axiosInstance";

//add Product

export const AddProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/products/add-product",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all products

export const GetProducts = async () => {
  try {
    const response = await axiosInstance.get("/api/products/get-products");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//edit product

export const editProduct = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/products/editProduct/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
