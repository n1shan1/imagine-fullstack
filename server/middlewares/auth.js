import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token not found. Login to get access.",
    });
  }

  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenData) {
      req.body.userId = tokenData.id;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid token. Login to get access.",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export default userAuth;
