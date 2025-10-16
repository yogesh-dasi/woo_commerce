const express = require("express");
const cron = require("node-cron");
const { connectDB, PORT } = require("./config");
const apiRouter = require("./routes");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

cron.schedule("0 */6 * * *", async () => {
  console.log("Running scheduled product ingestion...");
  await ingestProducts();
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Product service running on PORT ${PORT}`);
});

module.exports = app;
