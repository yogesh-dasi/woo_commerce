import { TABS } from "../../constants/config";

export const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: TABS.PRODUCTS, label: "Products" },
    { id: TABS.FILTER, label: "Filter Editor" },
  ];

  return (
    <div className="mb-6 flex justify-center gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === tab.id
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
