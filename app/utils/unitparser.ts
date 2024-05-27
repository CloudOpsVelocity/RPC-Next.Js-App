const SQUARE_FOOT_SUFFIX = " sq.ft";
const sortUnits = (units: string[]): string[] => {
  return units.sort((a, b) => {
    const aArea = parseInt(getAreaFromUnit(a));
    const bArea = parseInt(getAreaFromUnit(b));

    const aType = getUnitType(a);
    const bType = getUnitType(b);

    if (aArea === 1 && bArea === 1) {
      return compareTypes(aType, bType);
    }

    if (aArea === bArea) {
      return a.localeCompare(b);
    }

    return aArea - bArea;
  });

  function getAreaFromUnit(unit: string): string {
    const areaStr = unit.match(/\d+/)?.[0] || "0";
    return areaStr;
  }

  function getUnitType(unit: string): "RK" | "BHK" {
    return unit.includes("RK") ? "RK" : "BHK";
  }

  function compareTypes(a: "RK" | "BHK", b: "RK" | "BHK"): number {
    return a === "RK" && b === "BHK" ? -1 : a === "BHK" && b === "RK" ? 1 : 0;
  }
};

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
  const sortedUnits = sortUnits(parsedUnits);

  return propertyType && propertyType === "plot"
    ? sortedUnits.slice(0, 2).join(", ")
    : sortedUnits.slice(0, 4).join(", ");
};

export { parseUnitStrings as parseUnits, sortUnits };
