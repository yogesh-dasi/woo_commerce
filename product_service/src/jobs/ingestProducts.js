const axios = require("axios");
const { WOOCOMMERCE_CONFIG } = require("../config");
const Product = require("../models/Product");

async function ingestProducts() {
  console.log("Starting product ingestion");
  let page = 1;
  let hasMore = true;
  let totalIngested = 0;

  try {
    while (hasMore) {
      const response = await axios.get(
        `${WOOCOMMERCE_CONFIG.baseURL}/products`,
        { auth: WOOCOMMERCE_CONFIG.auth, params: { page, per_page: 100 } }
      );

      const products = response.data;

      if (products.length === 0) {
        hasMore = false;
        break;
      }

      for (const product of products) {
        const productData = {
          id: product.id,
          title: product.name,
          price: parseFloat(product.price) || 0,
          stock_status: product.stock_status,
          stock_quantity: product.stock_quantity,
          category: product.categories[0]?.name || "Uncategorized",
          tags: product.tags?.map((tag) => tag.name) || [],
          on_sale: product.on_sale || false,
          created_at: product.date_created,
        };

        await Product.findOneAndUpdate({ id: productData.id }, productData, {
          upsert: true,
          new: true,
        });

        totalIngested++;
      }
      page++;
      console.log(
        `Ingested page ${page - 1}, total products: ${totalIngested}`
      );
    }
    console.log(`✓ Ingestion complete: ${totalIngested} products`);
    return { success: true, count: totalIngested };
  } catch (error) {
    console.error("Ingestion error:", error.message);
    return { success: false, error: error.message };
  }
}

module.exports = ingestProducts;
