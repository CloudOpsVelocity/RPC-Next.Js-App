import { SearchFilter } from "@/app/types/search";

export const initialState: SearchFilter = {
  current: null,
  locality: [],
  propTypes: null,
  unitTypes: [],
  bathRooms: [],
  parkings: [],
  amenities: [],
  listedBy: null,
  reraVerified: [],
  areaValue: [0, 5000],
  bugdetValue: [500000, 600000000],
  builderIds: [],
  city: null,
  facings: [],
  furnish: null,
  propStatus: null,
  pnb: null,
  sortByfield: null,
  sortType: null,
  cg: null,
  projIdEnc: null,
  lat: null,
  lng: null,
  projName: null,
};

export default function parseProjectSearchQueryParams(params: string) {
  if (!params) return {};

  const filters: any = {};
  const paramPairs = params.split("-");
  const pairsLength = paramPairs.length;

  for (let i = 0; i < pairsLength; i++) {
    const [key, value] = paramPairs[i].split("=");

    if (!key || !value) continue;

    // Check for special cases first to avoid multiple string operations
    if (key === "areaValue" || key === "bugdetValue") {
      const [min, max] = value.split(",");
      filters[key] = [+min, +max];
      continue;
    }

    const hasComma = value.indexOf(",") !== -1;
    if (hasComma) {
      // Convert array values based on key type
      if (
        key === "bathRooms" ||
        key === "amenities" ||
        key === "parkings" ||
        key === "unitTypes"
      ) {
        filters[key] = value.split(",").map(Number);
      } else if (key === "builderIds") {
        filters[key] = value.split(",").map(Number);
      } else {
        filters[key] = value.split(",");
      }
    } else {
      // Convert single values based on key type
      if (key === "propTypes") {
        filters[key] = Number(value);
      } else if (key === "lat" || key === "lng") {
        filters[key] = Number(value);
      } else {
        filters[key] = value;
      }
    }
  }
  console.log({ ...initialState, ...filters });
  return { ...initialState, ...filters };
}
