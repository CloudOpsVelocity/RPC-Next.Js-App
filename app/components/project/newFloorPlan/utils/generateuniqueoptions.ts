export const getUniqueOptionsByKeys = (units: any[], keys: string[]) => {
  if (!units || units.length === 0) return {};

  return keys.reduce((result: Record<string, any>, key) => {
    const uniqueValues = new Set();
    units.forEach((unit) => {
      const value = unit[key];
      if (value != null && value == value) {
        // Excludes undefined, null, and NaN
        uniqueValues.add(value);
      }
    });

    const uniqueArray = Array.from(uniqueValues);
    if (uniqueArray.length > 0) {
      result[key] = uniqueArray; // Add only if the array has elements
    }
    return result;
  }, {});
};
