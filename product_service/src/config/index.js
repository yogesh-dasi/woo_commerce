const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

const WOOCOMMERCE_CONFIG = {
  baseURL: process.env.BASE_URL,
  auth: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
  },
};

module.exports = {
  PORT: process.env.PORT,
  connectDB,
  WOOCOMMERCE_CONFIG,
};
