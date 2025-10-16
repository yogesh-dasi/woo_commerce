const express = require("express");
const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const { evaluateProduct, parseConditions } = require("../utils/segmentUtils");
const { PRODUCT_SERVICE_URL } = require("../config");

const router = express.Router();

router.post("/segments/evaluate", async (req, res) => {
  try {
    const { rules } = req.body;

    if (!rules) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Rules are required" });
    }

    const conditions = parseConditions(rules);

    const response = await axios.get(`${PRODUCT_SERVICE_URL}/products`);
    const productData = response.data;

    const products = Array.isArray(productData)
      ? productData
      : productData.products || [];

    const filteredProducts = products.filter((product) =>
      evaluateProduct(product, conditions)
    );

    res.status(StatusCodes.OK).json({
      success: true,
      total_products: products.length,
      conditions_applied: conditions,
      filtered_count: filteredProducts.length,
      filtered_products: filteredProducts,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
      details: "Failed to evaluate segment",
    });
  }
});

module.exports = router;
