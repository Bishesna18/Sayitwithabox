import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    // FIX: Extract the token properly from "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];

    // FIX: Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // FIX: Attach userId to request (and it should be userId, not id)
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log("JWT error:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;
