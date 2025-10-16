import { RefreshCw } from "lucide-react";

export const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="text-center py-12">
      <RefreshCw
        className="animate-spin mx-auto text-blue-600 mb-4"
        size={48}
      />
      <p className="text-gray-600">{message}</p>
    </div>
  );
};
