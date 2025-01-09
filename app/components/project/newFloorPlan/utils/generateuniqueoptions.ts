import { PropertyUnit } from "../types/floor-plan";

export const getUniqueOptionsByKeys = (
  units: PropertyUnit[],
  keys: (keyof PropertyUnit)[],
  selectedFilters: Partial<PropertyUnit>
) => {
  if (!units || units.length === 0) return {};

  const filteredUnits = units.filter((unit) => {
    return Object.entries(selectedFilters).every(([key, value]) => {
      if (value === null || value === "") return true;
      return String(unit[key as keyof PropertyUnit]) === String(value);
    });
  });

  if (filteredUnits.length === 0) return {};

  let options: Record<keyof PropertyUnit, string[]> = keys.reduce(
    (result: Record<keyof PropertyUnit, string[]>, key) => {
      const uniqueValues = new Set<string>();

      filteredUnits.forEach((unit) => {
        const value = unit[key];
        if (value != null && value !== "" && value == value) {
          uniqueValues.add(String(value));
        }
      });

      const uniqueArray = Array.from(uniqueValues);
      if (uniqueArray.length > 0) {
        result[key] = uniqueArray;
      }

      return result;
    },
    {} as Record<keyof PropertyUnit, string[]>
  );

  return { options, filteredUnits };
};
