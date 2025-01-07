export const getUniqueOptionsByKeys = (
  units: any[],
  keys: string[],
  selectedFilters: Record<string, any>
) => {
  if (!units || units.length === 0) return {};
  // Step 1: Filter the units based on selected filters, excluding null and ""
  const filteredUnits = units.filter((unit) => {
    return Object.entries(selectedFilters).every(([key, value]) => {
      if (value === null || value === "") return true; // Include units if the filter value is null or ""
      return String(unit[key]) === String(value); // Only include units that match all selected filters
    });
  });

  // Step 2: If no units match the filters, return an empty object
  if (filteredUnits.length === 0) return {};

  // Step 3: Extract unique values for each key, apply transformations
  let options: Record<string, any> = keys.reduce(
    (result: Record<string, any>, key) => {
      const uniqueValues = new Set();

      filteredUnits.forEach((unit) => {
        const value = unit[key];

        // Exclude "", null, undefined, and convert numbers to strings
        if (value != null && value !== "" && value == value) {
          uniqueValues.add(String(value)); // Convert value to string
        }
      });

      const uniqueArray = Array.from(uniqueValues);
      if (uniqueArray.length > 0) {
        result[key] = uniqueArray; // Add only if the array has elements
      }

      return result;
    },
    {}
  );
  return { options, filteredUnits };
};
