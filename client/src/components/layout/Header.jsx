import { Package } from "lucide-react";

export const Header = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <Package className="text-blue-600 mr-3" size={48} />
        <h1 className="text-4xl font-bold text-gray-800">
          WooCommerce Segment Builder
        </h1>
      </div>
      <p className="text-gray-600">
        Filter and analyze products with custom rules
      </p>
    </header>
  );
};
