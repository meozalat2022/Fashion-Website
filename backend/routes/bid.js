import express from "express";
import { authVerification } from "../middleware/authVerification.js";
import { addNewBid, getAllBids } from "../controllers/bid.js";
const router = express.Router();

//place new bid

router.post("/placeNewBid", authVerification, addNewBid);

//get all bids

router.post("/getAllBid", authVerification, getAllBids);

export default router;
