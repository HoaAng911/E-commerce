import jwt from 'jsonwebtoken';
import ENV_VARS from '../config/ENV_VARS.js';

export const authMiddleware = (req, res, next) => {
  console.log("SECRET_KEY from env:", ENV_VARS.SECRET_KEY); // ✅ debug ở đây

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1]; // sửa split thành " "
  if (!token) {
    return res.status(401).json({ error: "Token không tồn tại" });
  }

  jwt.verify(token, ENV_VARS.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Token không hợp lệ' });
    }
    req.user = user;
    next();
  });
};
