// import React, { useState, useEffect } from "react";
// import {
//   Search,
//   Filter,
//   Package,
//   AlertCircle,
//   RefreshCw,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";

// const API_BASE = "http://localhost:3000";

// function App() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [filterRules, setFilterRules] = useState(
//     "price > 5000\ncategory = Smartphones\nstock_status = instock\nbrand != Samsung\nrating >= 4.0"
//   );
//   const [activeTab, setActiveTab] = useState("products");

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await fetch(`${API_BASE}/products`);
//       if (!response.ok) throw new Error("Failed to fetch products");
//       const data = await response.json();
//       setProducts(data?.products || []);
//       setFilteredProducts(data.products);
//     } catch (err) {
//       setError(err.message);
//       setProducts([]);
//       setFilteredProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const evaluateSegment = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(`${API_BASE}/segments/evaluate`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ rules: filterRules }),
//       });
//       if (!response.ok) throw new Error("Failed to evaluate segment");
//       const data = await response.json();

//       setFilteredProducts(data.filtered_products || []);
//     } catch (err) {
//       setError(err.message);
//       setFilteredProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetFilters = () => {
//     setFilterRules("");
//     setFilteredProducts(products);
//   };

//   const ProductCard = ({ product }) => (
//     <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//       <div className="flex items-start justify-between mb-3">
//         <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
//           {product.title}
//         </h3>
//         {product.on_sale && (
//           <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//             SALE
//           </span>
//         )}
//       </div>
//       <div className="space-y-2 text-sm">
//         <div className="flex items-center justify-between">
//           <span className="text-gray-600">Price:</span>
//           <span className="text-xl font-bold text-blue-600">
//             ₹{parseFloat(product.price).toLocaleString()}
//           </span>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="text-gray-600">Stock:</span>
//           {product.stock_status === "instock" ? (
//             <span className="flex items-center text-green-600">
//               <CheckCircle size={16} className="mr-1" />
//               In Stock ({product.stock_quantity || "N/A"})
//             </span>
//           ) : (
//             <span className="flex items-center text-red-600">
//               <XCircle size={16} className="mr-1" />
//               Out of Stock
//             </span>
//           )}
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="text-gray-600">Category:</span>
//           <span className="text-gray-800 font-medium">{product.category}</span>
//         </div>
//         {product.tags && product.tags.length > 0 && (
//           <div className="flex flex-wrap gap-1 mt-2">
//             {product.tags.map((tag, idx) => (
//               <span
//                 key={idx}
//                 className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}
//         <div className="text-xs text-gray-500 mt-2">
//           Added: {new Date(product.created_at).toLocaleDateString()}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="container mx-auto px-4 py-8">
//         <header className="text-center mb-8">
//           <div className="flex items-center justify-center mb-4">
//             <Package className="text-blue-600 mr-3" size={48} />
//             <h1 className="text-4xl font-bold text-gray-800">
//               WooCommerce Segment Builder
//             </h1>
//           </div>
//           <p className="text-gray-600">
//             Filter and analyze products with custom rules
//           </p>
//         </header>

//         <div className="mb-6 flex justify-center gap-4">
//           <button
//             onClick={() => setActiveTab("products")}
//             className={`px-6 py-2 rounded-lg font-medium transition-colors ${
//               activeTab === "products"
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-gray-700 hover:bg-gray-100"
//             }`}
//           >
//             Products
//           </button>
//           <button
//             onClick={() => setActiveTab("filter")}
//             className={`px-6 py-2 rounded-lg font-medium transition-colors ${
//               activeTab === "filter"
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-gray-700 hover:bg-gray-100"
//             }`}
//           >
//             Filter Editor
//           </button>
//         </div>

//         {error && (
//           <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded">
//             <div className="flex items-center">
//               <AlertCircle className="text-yellow-500 mr-2" size={20} />
//               <p className="text-yellow-700">{error}</p>
//             </div>
//           </div>
//         )}

//         {activeTab === "filter" && (
//           <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//               Define Filter Conditions
//             </h2>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Enter filter rules (one per line):
//             </label>
//             <textarea
//               value={filterRules}
//               onChange={(e) => setFilterRules(e.target.value)}
//               className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
//               placeholder="price > 5000&#10;category = Smartphones&#10;stock_status = instock&#10;brand != Samsung&#10;rating >= 4.0"
//             />
//             <p className="text-sm text-gray-500 mt-2">
//               Examples: price {">"} 5000, category = Smartphones, stock_status =
//               instock
//             </p>
//             <div className="mt-4 bg-gray-50 rounded p-4">
//               <p className="text-sm font-medium text-gray-700 mb-2">
//                 Supported operations:
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {["=", "!=", ">", "<", ">=", "<="].map((op) => (
//                   <span
//                     key={op}
//                     className="bg-white px-3 py-1 rounded border text-sm font-mono"
//                   >
//                     {op}
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={evaluateSegment}
//                 disabled={loading}
//                 className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
//               >
//                 {loading ? (
//                   <>
//                     <RefreshCw className="animate-spin mr-2" size={20} />
//                     Evaluating...
//                   </>
//                 ) : (
//                   <>
//                     <Filter className="mr-2" size={20} />
//                     Evaluate Filter
//                   </>
//                 )}
//               </button>
//               <button
//                 onClick={resetFilters}
//                 className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
//               >
//                 Reset
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="mb-6 flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-gray-800">
//             {activeTab === "products" ? "All Products" : "Filtered Products"} (
//             {filteredProducts.length})
//           </h2>
//           <button
//             onClick={fetchProducts}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             <RefreshCw size={16} />
//             Refresh
//           </button>
//         </div>

//         {loading && activeTab === "products" ? (
//           <div className="text-center py-12">
//             <RefreshCw
//               className="animate-spin mx-auto text-blue-600 mb-4"
//               size={48}
//             />
//             <p className="text-gray-600">Loading products...</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}

//         {filteredProducts.length === 0 && !loading && (
//           <div className="text-center py-12 bg-white rounded-lg">
//             <Package className="mx-auto text-gray-400 mb-4" size={64} />
//             <p className="text-gray-600 text-lg">
//               No products found matching your criteria
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import {
  Header,
  TabNavigation,
  ErrorAlert,
  FilterEditor,
  ProductGrid,
} from "./components";
import { useProducts } from "./hooks/useProducts";
import { DEFAULT_FILTER_RULES, TABS } from "./constants/config";

function App() {
  const {
    filteredProducts,
    loading,
    error,
    loadProducts,
    applyFilters,
    resetFilters,
  } = useProducts();

  const [filterRules, setFilterRules] = useState(DEFAULT_FILTER_RULES);
  const [activeTab, setActiveTab] = useState(TABS.PRODUCTS);

  const handleEvaluateSegment = () => {
    applyFilters(filterRules);
  };

  const handleResetFilters = () => {
    setFilterRules("");
    resetFilters();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <ErrorAlert message={error} />

        {activeTab === TABS.FILTER && (
          <FilterEditor
            filterRules={filterRules}
            onFilterChange={setFilterRules}
            onEvaluate={handleEvaluateSegment}
            onReset={handleResetFilters}
            loading={loading}
          />
        )}

        <ProductGrid
          products={filteredProducts}
          loading={loading}
          showProducts={activeTab === TABS.PRODUCTS}
          title={
            activeTab === TABS.PRODUCTS ? "All Products" : "Filtered Products"
          }
          onRefresh={loadProducts}
        />
      </div>
    </div>
  );
}

export default App;
