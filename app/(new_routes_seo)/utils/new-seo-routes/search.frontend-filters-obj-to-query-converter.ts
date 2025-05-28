type GenerateSearchQueryParams = {
  appliedFilters: Record<string, any>;
  initialState: Record<string, any>;
  otherIgnoreKeys?: string[];
};

export function generateSearchQuery({
  appliedFilters,
  initialState,
  otherIgnoreKeys = [],
}: GenerateSearchQueryParams): string {
  const RENT_BUDGET_VALUE = [0, 100000];
  const ignoreKeys = new Set(["currentPage", ...otherIgnoreKeys]);
  const parts: string[] = [];

  for (const [key, value] of Object.entries(appliedFilters)) {
    if (ignoreKeys.has(key)) continue;

    const isDefaultRange =
      Array.isArray(value) &&
      (key === "areaValue" || key === "bugdetValue") &&
      value[0] === initialState[key]?.[0] &&
      value[1] === initialState[key]?.[1];

    const isDefaultRent =
      key === "bugdetValue" &&
      appliedFilters.cg === "R" &&
      Array.isArray(value) &&
      value[0] === RENT_BUDGET_VALUE[0] &&
      value[1] === RENT_BUDGET_VALUE[1];

    if (isDefaultRange || isDefaultRent) continue;

    if (Array.isArray(value) && value.length > 0) {
      const formatted = value
        .map((v) => (typeof v === "string" ? v.replace(/-/g, " ") : v))
        .join(",");
      parts.push(`${key}=${formatted}`);
    } else if (value != null) {
      const formatted =
        key === "projName" && typeof value === "string"
          ? value.replace(/-/g, " ")
          : value;
      parts.push(`${key}=${formatted}`);
    }
  }

  return encodeURIComponent(parts.join("-"));
}
