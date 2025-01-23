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
  "aptType",
];

export const getUniqueOptionsByKeys = (
  units: PropertyUnit[],
  keys: (keyof PropertyUnit)[],
  selectedFilters: Partial<PropertyUnit>,
  cacheKey: string
) => {
  if (!units || units.length === 0) return {};

  // Filter units based on selected filters
  const filteredUnits = units.filter((unit) => {
    return Object.entries(selectedFilters).every(([key, value]) => {
      if (value == null || value === "") return true;

      // Special handling for "floor" key
      if (key === "floor") {
        const unitValue = String(unit[key as keyof PropertyUnit]);
        const filterValue = value === "G" ? "0" : String(value);
        return unitValue === filterValue;
      }

      return String(unit[key as keyof PropertyUnit]) === String(value);
    });
  });

  if (filteredUnits.length === 0) return {};

  // Cache for BHK options
  const cacheAllBhkOptions = new Map<string, string[]>();
  if (!cacheAllBhkOptions.has(cacheKey)) {
    const uniqueBhkNames = Array.from(
      new Set(units.map((unit) => unit["bhkName"]).filter(Boolean))
    );
    cacheAllBhkOptions.set(cacheKey, uniqueBhkNames);
  }

  // Initialize options map
  const options: Record<keyof PropertyUnit, string[]> = {} as Record<
    keyof PropertyUnit,
    string[]
  >;

  // Process filtered units to extract unique values for each key
  keys.forEach((key) => {
    const uniqueValues = new Set<string>();
    filteredUnits.forEach((unit) => {
      const value = unit[key];
      if (value !== undefined && value !== "null" && value !== "None") {
        let processedValue = String(value);
        if (key === "floor" && processedValue == "0") {
          processedValue = "G"; // Replace "0" with "G" for "floor"
        } else if (processedValue === "0" && key !== "floor") {
          return; // Skip adding "0" for non-floor keys
        }
        uniqueValues.add(processedValue);
      }
    });
    if (uniqueValues.size > 0) {
      options[key] = Array.from(uniqueValues);
    }
  });

  return {
    options,
    filteredUnits,
    cacheAllBhkOptions: ["All", ...(cacheAllBhkOptions.get(cacheKey) || [])],
  };
};
