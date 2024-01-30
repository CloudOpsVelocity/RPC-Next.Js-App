const SQUARE_FOOT_SUFFIX = " sq.ft";

const parseUnitStrings = (unitStrings: string[]): string => {
  const parsedUnits: string[] = [];

  unitStrings.forEach((unit) => {
    const parts = unit.split("_").map((part) => part.trim());
    const [length, width] = parts.map(parseFloat);
    if (!isNaN(length) && !isNaN(width)) {
      parsedUnits.push(`${length} x ${width}${SQUARE_FOOT_SUFFIX}`);
    } else {
      parsedUnits.push(unit);
    }
  });
  return parsedUnits.join(", ");
};

export { parseUnitStrings as parseUnits };
