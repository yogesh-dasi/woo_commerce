import { Package, RefreshCw } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { LoadingSpinner } from "../common/LoadingSpinner";

export const ProductGrid = ({
  products,
  loading,
  showProducts,
  title,
  onRefresh,
}) => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {title} ({products.length})
        </h2>
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {loading && showProducts ? (
        <LoadingSpinner message="Loading products..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {products.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-lg">
          <Package className="mx-auto text-gray-400 mb-4" size={64} />
          <p className="text-gray-600 text-lg">
            No products found matching your criteria
          </p>
        </div>
      )}
    </>
  );
};
