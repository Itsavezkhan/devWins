import User from "./models/user.model.js";
import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Received token:", req.cookies.token);
    if (!token) {
      return res.status(401).json({ message: "Token isn't provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User can't be found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("auth error at catch", error?.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;
