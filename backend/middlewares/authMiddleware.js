import jwt from "jsonwebtoken";
import ENV_VARS from "../config/ENV_VARS.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token không tồn tại" });

  try {
    const decoded = jwt.verify(token, ENV_VARS.SECRET_KEY);
    req.user = { id: decoded.id }; // phải có id
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token không hợp lệ" });
  }
};
