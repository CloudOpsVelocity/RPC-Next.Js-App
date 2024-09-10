type UnitDataDto = {
  projUnitIdEnc: string;
  unitType: string;
  phaseId: number;
  propType: string;
  sba: string;
  ca: string;
  floorPlan?: string;
};

type UnitDetails = {
  minPrice: string;
  maxPrice: string;
  minSba: string;
  maxSba: string;
  minCa: string;
  maxCa: string;
  unitDataDtoList: UnitDataDto[];
};

type TransformedData = {
  [phaseId: string]: {
    apartment: { [unitType: string]: UnitDetails };
    villa: { [unitType: string]: UnitDetails };
    plot: { [unitType: string]: UnitDetails };
    rowhouse: { [unitType: string]: UnitDetails };
    villament: { [unitType: string]: UnitDetails };
  };
};
export function paritalUnitParser(input: any[]): TransformedData {
  const result: any = {};

  input.forEach((phase: any) => {
    const phaseId = `${phase.phaseId}`;
    const unitData: UnitDetails = {
      minPrice: "",
      maxPrice: "",
      minSba: "",
      maxSba: "",
      minCa: "",
      maxCa: "",
      unitDataDtoList: [],
    };

    // Property types to iterate through
    const propertyTypes = ["apt", "rowHouse", "villa", "vlmt", "plot"];

    propertyTypes.forEach((propType) => {
      // Check if the property type exists in the phase
      const propertyOverview = phase?.propTypeOverview?.[propType];

      if (propertyOverview) {
        propertyOverview.priceList?.forEach((priceItem: any) => {
          const unitType = priceItem.bhkOrDimension;

          if (!result[phaseId]) {
            result[phaseId] = {
              apartment: {},
              villa: {},
              plot: {},
              rowhouse: {},
              villament: {},
            };
          }

          const propKey = mapPropTypeToKey(propType);

          if (!result[phaseId][propKey][unitType]) {
            result[phaseId][propKey][unitType] = { ...unitData };
          }

          result[phaseId][propKey][unitType].minPrice = priceItem.minPrice;
          result[phaseId][propKey][unitType].maxPrice = priceItem.maxPrice;
          // These values would be calculated or extracted based on your data
          result[phaseId][propKey][unitType].minSba = priceItem.minSba; // Placeholder value
          result[phaseId][propKey][unitType].maxSba = priceItem.maxSba; // Placeholder value
          result[phaseId][propKey][unitType].minCa = priceItem.minCa; // Placeholder value
          result[phaseId][propKey][unitType].maxCa = priceItem.maxCa; // Placeholder value

          const unitDataDto: UnitDataDto = {
            projUnitIdEnc: "placeholder_id", // Replace with actual ID
            unitType: unitType,
            phaseId: phase.phaseId,
            propType: "35", // Placeholder value
            sba: "N/A", // Placeholder value
            ca: "N/A", // Placeholder value
            floorPlan:
              "https://d2l0lb5gc1bw3t.cloudfront.net/images/varify/soc/7/35/454/fp.webp?v=1725616219771", // Replace with actual floor plan URL
          };

          result[phaseId][propKey][unitType].unitDataDtoList.push(unitDataDto);
        });
      }
    });
  });

  return result;
}

// Helper function to map propType to the correct key in the result object
function mapPropTypeToKey(propType: string): string {
  switch (propType) {
    case "apt":
      return "apartment";
    case "rowHouse":
      return "rowhouse";
    case "villa":
      return "villa";
    case "vlmt":
      return "villament";
    case "plot":
      return "plot";
    default:
      return "unknown";
  }
}
