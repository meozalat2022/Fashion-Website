import Bid from "../models/bid.js";

//add new bid
export const addNewBid = async (req, res, next) => {
  try {
    const newBid = new Bid(req.body);
    await newBid.save();
    res.send({
      success: true,
      message: "Bid Added Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// get all bids

export const getAllBids = async (req, res, next) => {
  try {
    const { product, seller } = req.body;

    let filter = {};
    if (product) {
      filter.product = product;
    }

    if (seller) {
      filter.seller = seller;
    }
    const bids = await Bid.find(filter)
      .populate("product")
      .populate("buyer")
      .populate("seller");

    res.send({
      success: true,
      data: bids,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
