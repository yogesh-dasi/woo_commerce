const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  PRODUCT_SERVICE: process.env.PRODUCT_SERVICE_URL,
  SEGMENT_SERVICE: process.env.SEGMENT_SERVICE_URL,
};
