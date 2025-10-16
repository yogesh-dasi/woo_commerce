export const API_BASE = process.env.REACT_APP_GATEWAY_URL;

export const FILTER_OPERATORS = ["=", "!=", ">", "<", ">=", "<="];

export const DEFAULT_FILTER_RULES = `price > 200
category = Jackets
stock_status = instock
rating >= 4.0`;

export const TABS = {
  PRODUCTS: "products",
  FILTER: "filter",
};
