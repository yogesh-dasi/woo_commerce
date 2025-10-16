const express = require("express");
const apiRouter = require("./routes");
const { PORT, PRODUCT_SERVICE_URL } = require("./config");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.listen(PORT, async () => {
  console.log(`Segment Service running on port ${PORT}`);
  console.log(`Product Service URL: ${PRODUCT_SERVICE_URL}`);
});
