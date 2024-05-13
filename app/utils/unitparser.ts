const SQUARE_FOOT_SUFFIX = " sq.ft";

const parseUnitStrings = (
  unitStrings: string[],
  propertyType?: string
): string => {
  const parsedUnits: string[] = [];

  unitStrings?.forEach((unit) => {
    const parts = unit.split("_").map((part) => part.trim());
    const [length, width] = parts.map(parseFloat);
    if (!isNaN(length) && !isNaN(width)) {
      parsedUnits.push(`${length} x ${width}${SQUARE_FOOT_SUFFIX}`);
    } else {
      parsedUnits.push(unit);
    }
  });
  return propertyType && propertyType === "plot"
    ? parsedUnits.sort().slice(0, 2).join(", ")
    : parsedUnits.sort().slice(0, 4).join(", ");
};

export { parseUnitStrings as parseUnits };
