const SQUARE_FOOT_SUFFIX = " sq.ft";
const bhkMap = new Map([
  ["1 RK", 0],
  ["1 BHK", 1],
  ["2 BHK", 2],
  ["3 BHK", 3],
  ["4 BHK", 4],
  ["4+ BHK", 5],
]);
const sortUnits = (units: string[]): string[] => {
  return units.sort((a, b) => (bhkMap.get(a) ?? 0) - (bhkMap.get(b) ?? 0));
};

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

const parseUnitStrings = (
  unitStrings: string[],
  propertyType?: string
): string[] => {
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
    ? sortedUnits.slice(0, 2)
    : sortedUnits.slice(0, 4);
};

export { parseUnitStrings as parseUnits, sortUnits };
