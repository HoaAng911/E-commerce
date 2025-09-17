import express from "express";
import ENV_VARS from "./config/ENV_VARS.js";
import ConnectDB from "./config/db.js";
import userRouter from "./routers/User.route.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/user", userRouter);

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
