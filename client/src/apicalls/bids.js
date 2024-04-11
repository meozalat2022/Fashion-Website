import { axiosInstance } from "./axiosInstance";

// add new bid

export const AddNewBid = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/bids/placeNewBid", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get all bids

export const GetAllBids = async (filter) => {
  try {
    const response = await axiosInstance.post("/api/bids/getAllBid", filter);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
