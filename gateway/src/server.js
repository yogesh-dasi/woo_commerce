const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { StatusCodes } = require("http-status-codes");
const { PORT, PRODUCT_SERVICE, SEGMENT_SERVICE } = require("./config");

const app = express();

app.use(cors({ origin: true, credentials: true }));

app.get("/ping", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Pong" });
});

app.use(
  "/products",
  createProxyMiddleware({
    target: PRODUCT_SERVICE,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/api/products/",
    },
  })
);

app.use(
  "/ingest",
  createProxyMiddleware({
    target: PRODUCT_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/": "/api/ingest" },
  })
);

app.use(
  "/stats",
  createProxyMiddleware({
    target: PRODUCT_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/": "/api/stats" },
  })
);

app.use(
  "/segments/evaluate",
  createProxyMiddleware({
    target: SEGMENT_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/": "/api/segments/evaluate" },
  })
);

app.use((req, res) => {
  res.status(404).send("Not found");
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Routing to:`);
  console.log(`  - Product Service: ${PRODUCT_SERVICE}`);
  console.log(`  - Segment Service: ${SEGMENT_SERVICE}`);
});
