const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  PRODUCT_SERVICE_URL: process.env.PRODUCT_SERVICE,
  SEGMENT_SERVICE_URL: process.env.SEGMENT_SERVICE,
};
