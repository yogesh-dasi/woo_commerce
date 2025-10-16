export const formatPrice = (price) => {
  return `₹${parseFloat(price).toLocaleString()}`;
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

export const getStockQuantityDisplay = (quantity) => {
  return quantity || "N/A";
};
