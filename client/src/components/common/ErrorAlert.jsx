import { AlertCircle } from "lucide-react";

export const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded">
      <div className="flex items-center">
        <AlertCircle className="text-yellow-500 mr-2" size={20} />
        <p className="text-yellow-700">{message}</p>
      </div>
    </div>
  );
};
