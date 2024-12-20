export default function parseProjectSearchQueryParams(params: string) {
  if (!params) return {};

  const filters: any = {};
  // Pre-allocate array to avoid resizing
  const paramPairs = params.split("-");
  const pairsLength = paramPairs.length;

  for (let i = 0; i < pairsLength; i++) {
    const [key, value] = paramPairs[i].split("=");

    if (!key || !value) continue;

    // Check for special cases first to avoid multiple string operations
    if (key === "areaValue" || key === "bugdetValue") {
      // Convert to numbers directly without intermediate array
      const [min, max] = value.split(",");
      filters[key] = [+min, +max];
      continue;
    }

    const hasComma = value.indexOf(",") !== -1;
    if (hasComma) {
      filters[key] = value.split(",");
    } else {
      filters[key] = value;
    }
  }

  return filters;
}
