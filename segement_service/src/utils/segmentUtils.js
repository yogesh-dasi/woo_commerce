function parseConditions(rules) {
  if (!rules || typeof rules !== "string") {
    throw new Error("Invalid rules format");
  }

  const validOperators = [">=", "<=", "!=", "=", ">", "<"];
  const validFields = [
    "id",
    "title",
    "price",
    "stock_status",
    "stock_quantity",
    "category",
    "tags",
    "on_sale",
    "created_at",
    "brand",
    "rating",
  ];

  const conditionStrings = rules
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const conditions = [];

  for (const conditionStr of conditionStrings) {
    const match = conditionStr.match(/(\w+)\s*(>=|<=|!=|=|>|<)\s*([^\s,]+)/);

    if (!match) {
      throw new Error(`Invalid condition format: ${conditionStr}`);
    }

    const [, field, operator, value] = match;

    if (!validFields.includes(field)) {
      throw new Error(
        `Invalid field: ${field}. Valid fields: ${validFields.join(", ")}`
      );
    }

    if (!validOperators.includes(operator)) {
      throw new Error(`Invalid operator: ${operator}`);
    }

    conditions.push({
      field: field.trim(),
      operator: operator.trim(),
      value: value.trim(),
    });
  }

  return conditions;
}

function evaluateProduct(product, conditions) {
  return conditions.every((condition) => {
    const { field, operator, value } = condition;
    let productValue = product[field];

    if (productValue === null || productValue === undefined) {
      return operator === "!=" || operator === "<" || operator === "<=";
    }

    if (Array.isArray(productValue)) {
      if (operator === "=" || operator === "!=") {
        const contains = productValue.some((tag) =>
          tag.toLowerCase().includes(value.toLowerCase())
        );
        return operator === "=" ? contains : !contains;
      }
      return false;
    }

    const productStr = String(productValue).toLowerCase();
    const valueStr = value.toLowerCase();

    switch (operator) {
      case "=":
        if (field === "stock_status") {
          const normalizedProduct = productStr.replace(/[_-]/g, "");
          const normalizedValue = valueStr.replace(/[_-]/g, "");
          return normalizedProduct === normalizedValue;
        }
        return productStr === valueStr;

      case "!=":
        if (field === "stock_status") {
          const normalizedProduct = productStr.replace(/[_-]/g, "");
          const normalizedValue = valueStr.replace(/[_-]/g, "");
          return normalizedProduct !== normalizedValue;
        }
        return productStr !== valueStr;

      case ">":
        return parseFloat(productValue) > parseFloat(value);

      case "<":
        return parseFloat(productValue) < parseFloat(value);

      case ">=":
        return parseFloat(productValue) >= parseFloat(value);

      case "<=":
        return parseFloat(productValue) <= parseFloat(value);

      default:
        return false;
    }
  });
}

module.exports = {
  parseConditions,
  evaluateProduct,
};
