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
