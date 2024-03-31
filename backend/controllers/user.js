import User from "../models/user.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
export const registerUser = async (req, res, next) => {
  //check if user exists

  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      throw new Error("User already exists");
    }

    // hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export const userLogin = async (req, res, next) => {
  try {
    //check if user exists

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error("User not found");
    }

    // compare password

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      throw new Error("Wrong credentials");
    }

    //create token

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //send response
    res.send({
      success: true,
      message: "User Logged in successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      success: true,
      message: "User found successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
