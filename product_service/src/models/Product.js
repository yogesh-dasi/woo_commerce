const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, default: 0 },
    stock_status: { type: String, default: "outofstock" },
    stock_quantity: { type: Number, default: 0 },
    category: { type: String, default: "Uncategorized" },
    tags: [{ type: String }],
    on_sale: { type: Boolean, default: false },
    created_at: { type: Date },
    updated_at: { type: Date, default: Date.now },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Product", productSchema);
