const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  PRODUCT_SERVICE: process.env.PRODUCT_SERVICE,
  SEGMENT_SERVICE: process.env.SEGMENT_SERVICE,
};
