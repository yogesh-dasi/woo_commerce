import { Filter, RefreshCw } from "lucide-react";
import { FILTER_OPERATORS } from "../../constants/config";

export const FilterEditor = ({
  filterRules,
  onFilterChange,
  onEvaluate,
  onReset,
  loading,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Define Filter Conditions
      </h2>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Enter filter rules (one per line):
      </label>
      <textarea
        value={filterRules}
        onChange={(e) => onFilterChange(e.target.value)}
        className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
        placeholder="price > 5000&#10;category = Smartphones&#10;stock_status = instock&#10;brand != Samsung&#10;rating >= 4.0"
      />
      <p className="text-sm text-gray-500 mt-2">
        Examples: price {">"} 5000, category = Smartphones, stock_status =
        instock
      </p>
      <div className="mt-4 bg-gray-50 rounded p-4">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Supported operations:
        </p>
        <div className="flex flex-wrap gap-2">
          {FILTER_OPERATORS.map((op) => (
            <span
              key={op}
              className="bg-white px-3 py-1 rounded border text-sm font-mono"
            >
              {op}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          onClick={onEvaluate}
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <RefreshCw className="animate-spin mr-2" size={20} />
              Evaluating...
            </>
          ) : (
            <>
              <Filter className="mr-2" size={20} />
              Evaluate Filter
            </>
          )}
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
