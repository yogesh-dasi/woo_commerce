import { API_BASE } from "../constants/config";

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE}/products`);
  if (!response.ok) throw new Error("Failed to fetch products");
  const data = await response.json();
  return data?.products || [];
};

export const evaluateSegment = async (rules) => {
  const response = await fetch(`${API_BASE}/segments/evaluate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rules }),
  });
  if (!response.ok) throw new Error("Failed to evaluate segment");
  const data = await response.json();
  return data.filtered_products || [];
};
