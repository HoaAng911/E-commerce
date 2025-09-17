import mongoose from "mongoose";
import ENV_VARS from "./ENV_VARS.js";

const ConnectDB = async () => {
  try {
    await mongoose.connect(ENV_VARS.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Lỗi kết nối MongoDB:", err.message);
    process.exit(1);
  }
};

export default ConnectDB;
