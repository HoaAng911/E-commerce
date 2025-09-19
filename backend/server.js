import express from "express";
import ENV_VARS from "./config/ENV_VARS.js";
import ConnectDB from "./config/db.js";
import userRouter from "./routers/User.route.js";
import productRouter from './routers/Product.route.js'
import cartRouter from './routers/Cart.route.js'
import cors from 'cors'
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173" 
}));
// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
// Start server
app.listen(ENV_VARS.PORT || 5000, async () => {
  try {
    await ConnectDB();
    console.log(` Server đang chạy tại: http://localhost:${ENV_VARS.PORT || 5000}`);
  } catch (err) {
    console.error(" DB connection failed:", err.message);
    process.exit(1);
  }
});
