import { SearchFilter } from "@/app/store/search";

export const filtersParserToQueryParams = (data: SearchFilter) => {
  const parsedData: any = {};

  parsedData.localities = data.locality;
  parsedData.city = data.current; // Assuming current represents city ID
  parsedData.projStatus = null; // Need to handle project status
  parsedData.propType = data.propTypes;
  parsedData.bhk = data.unitTypes;
  parsedData.minPrice = data.bugdetValue[0];
  parsedData.maxPrice = data.bugdetValue[1];
  parsedData.minArea = data.areaValue[0];
  parsedData.maxArea = data.areaValue[1];
  parsedData.bathroom = data.bathRooms;
  parsedData.parking = data.parkings;
  parsedData.amenities = data.amenities;
  parsedData.postedBy = null; // Need to handle postedBy
  parsedData.builderIds = null; // Need to handle builderIds

  // Construct query parameters
  let queryParams = "";
  for (const key in parsedData) {
    if (parsedData[key] !== null && parsedData[key] !== undefined) {
      if (Array.isArray(parsedData[key]) && parsedData[key].length > 0) {
        // Handle arrays by joining elements with commas
        queryParams += `&${key}=${parsedData[key].join(",")}`;
      } else if (!Array.isArray(parsedData[key])) {
        // Handle other types directly
        queryParams += `&${key}=${parsedData[key]}`;
      }
    }
  }

  return queryParams;
};
export const propertiesToProcess: { [key: string]: string } = {
  localities: "locality",
  city: "current",
  propTypes: "propTypes",
  unitTypes: "unitTypes",
  bathRooms: "bathRooms",
  parkings: "parkings",
  amenities: "amenities",
  listedBy: "listedBy",
  reraVerified: "reraVerified",
  minArea: "areaValue",
  maxArea: "areaValue",
  minPrice: "bugdetValue",
  maxPrice: "bugdetValue",
};
export const filterParser = (data: SearchFilter) => {
  const parsedData: any = {};

  for (const [parsedKey, dataKey] of Object.entries(propertiesToProcess)) {
    // @ts-ignore
    const value = data[dataKey];
    if (
      parsedKey === "minArea" ||
      parsedKey === "maxArea" ||
      parsedKey === "minPrice" ||
      parsedKey === "maxPrice"
    ) {
      const intValue = parseInt(value[parsedKey.includes("min") ? 0 : 1], 10);
      if (!isNaN(intValue)) {
        parsedData[parsedKey] = intValue;
      }
    }

    if (Array.isArray(value) && value.length > 0) {
      if (
        parsedKey !== "minArea" &&
        parsedKey !== "maxArea" &&
        parsedKey !== "minPrice" &&
        parsedKey !== "maxPrice"
      ) {
        parsedData[parsedKey] = value.join(",");
      }
    } else if (value !== null && value !== "" && !Array.isArray(value)) {
      parsedData[parsedKey] = value;
    }
  }

  return parsedData;
};
