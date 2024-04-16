import jwt from "jsonwebtoken";
export const authVerification = (req, res, next) => {
  try {
    //get the token from header

    const token = req.cookies.access_token;
    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decryptedToken.userId;
    next();
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
