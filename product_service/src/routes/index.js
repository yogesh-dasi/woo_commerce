const express = require("express");
const { StatusCodes } = require("http-status-codes");
const ingestProducts = require("../jobs/ingestProducts");
const Product = require("../models/Product");

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    const total = await Product.countDocuments();

    res.status(StatusCodes.OK).json({
      success: true,
      total,
      products,
    });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: error.message });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id: parseInt(id) });

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }
    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
});

router.post("/ingest", async (req, res) => {
  const result = await ingestProducts();
  if (result.success) {
    res
      .status(StatusCodes.OK)
      .json({ message: "Ingestion completed", count: result.count });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: result.error });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const total = await Product.countDocuments();
    const inStock = await Product.countDocuments({ stock_status: "instock" });
    const onSale = await Product.countDocuments({ on_sale: true });

    const categories = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      total,
      inStock,
      onSale,
      outOfStock: total - inStock,
      categories: categories.map((c) => ({ name: c._id, count: c.count })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
