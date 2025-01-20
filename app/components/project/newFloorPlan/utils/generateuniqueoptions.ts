import { PropertyUnit } from "../types/floor-plan";

export const UNIT_DATA_KEYS = [
  "unitNumber",
  "bhkName",
  "towerName",
  "floor",
  "facingName",
  "block",
  "plotArea",
  "width",
  "length",
  "caretarea",
  "superBuildUparea",
  "totalNumberofBathroom",
  "totalNumberOfBalcony",
  "noOfCarParking",
  "parkingType",
  "terraceArea",
];

export const getUniqueOptionsByKeys = (
  units: PropertyUnit[],
  keys: (keyof PropertyUnit)[],
  selectedFilters: Partial<PropertyUnit>
) => {
  if (!units || units.length === 0) return {};

  const filteredUnits = units.filter((unit) => {
    return Object.entries(selectedFilters).every(([key, value]) => {
      if (value == null || value === "") return true;

      // Handle special case for "floor" key
      if (key === "floor") {
        const unitValue = String(unit[key as keyof PropertyUnit]);
        const filterValue = value === "G" ? "0" : String(value);
        return unitValue === filterValue;
      }

      return String(unit[key as keyof PropertyUnit]) === String(value);
    });
  });

  if (filteredUnits.length === 0) return {};

  let options: Record<keyof PropertyUnit, string[]> = keys.reduce(
    (result: Record<keyof PropertyUnit, string[]>, key) => {
      const uniqueValues = new Set<string>();

      filteredUnits.forEach((unit) => {
        const value = unit[key];
        // Handle edge case where value is string "null"
        if (value === "null") return;
        if (value != null && value !== "") {
          let processedValue = String(value);
          if (key === "floor" && processedValue === "0") {
            processedValue = "G"; // Replace "0" with "G" for "floor" key
          } else if (processedValue === "0" && key !== "floor") {
            return; // Skip adding "0" for keys other than "floor"
          }
          uniqueValues.add(processedValue);
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
