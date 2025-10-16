import { CheckCircle, XCircle } from "lucide-react";
import {
  formatPrice,
  formatDate,
  getStockQuantityDisplay,
} from "../../utils/formatters";

export const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {product.title}
        </h3>
        {product.on_sale && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            SALE
          </span>
        )}
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Price:</span>
          <span className="text-xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Stock:</span>
          {product.stock_status === "instock" ? (
            <span className="flex items-center text-green-600">
              <CheckCircle size={16} className="mr-1" />
              In Stock ({getStockQuantityDisplay(product.stock_quantity)})
            </span>
          ) : (
            <span className="flex items-center text-red-600">
              <XCircle size={16} className="mr-1" />
              Out of Stock
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Category:</span>
          <span className="text-gray-800 font-medium">{product.category}</span>
        </div>
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {product.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="text-xs text-gray-500 mt-2">
          Added: {formatDate(product.created_at)}
        </div>
      </div>
    </div>
  );
};
