const keyConversionMap: { [oldKey: string]: string } = {
  bhk: "unitTypes",
  propType: "propTypes",
  locality: "localities",
  city: "city",
  bugdetValue: "min",
};
const DEFAULT_BUGDET_VALUE: [number, number] = [500000, 600000000];
const DEFAULT_BUGDET_VALUE_RENT: [number, number] = [0, 100000];

type QueryParams = { [key: string]: any };
function formatArray(value: any[]): string {
  return value.map((item) => encodeURIComponent(String(item))).join(",");
}
function toQueryParams(params: QueryParams): string {
  const queryEntries: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    // Convert keys if they are in the conversion map
    const newKey = keyConversionMap[key] || key;

    // Handle 'showFilter' exclusion
    if (newKey === "showFilter") continue;

    if (key === "bugdetValue") {
      // Include bugdetValue only if it differs from the default
      if (
        Array.isArray(value) &&
        value.length === 2 &&
        !(
          (value[0] === DEFAULT_BUGDET_VALUE[0] &&
          value[1] === DEFAULT_BUGDET_VALUE[1]) ||
          (value[0] === DEFAULT_BUGDET_VALUE_RENT[0] &&
          value[1] === DEFAULT_BUGDET_VALUE_RENT[1])
        )
      ) {
        queryEntries.push(`minPrice=${encodeURIComponent(String(value[0]))}`);
        queryEntries.push(`maxPrice=${encodeURIComponent(String(value[1]))}`);
      }
      continue; // Skip the original bugdetValue entry
    }

    if (value === null) {
      // Skip null values
      continue;
    }

    let paramValue: string;

    if (Array.isArray(value)) {
      // Handle array values
      paramValue = formatArray(value);
      // Skip empty arrays
      if (paramValue === "") continue;
    } else {
      // Convert single value to string and encode
      paramValue = encodeURIComponent(String(value));
      // Skip empty strings
      if (paramValue === "") continue;
    }

    queryEntries.push(`${encodeURIComponent(newKey)}=${paramValue}`);
  }

  return queryEntries.join("&");
}
export { toQueryParams };
