interface Params {
  [key: string]: any;
}

const convertToQueryParams = (params: Params): string => {
  const queryParams: string[] = [];

  const paramMappings: { [key: string]: string } = {
    localities: "localities",
    city: "city",
    propTypes: "propType",
    unitTypes: "bhk",
    bathRooms: "bathroom",
    parkings: "parking",
    amenities: "amenities",
    listedBy: "listedBy",
    reraVerified: "reraVerified",
    minArea: "minArea",
    maxArea: "maxArea",
    minPrice: "minPrice",
    maxPrice: "maxPrice",
    projStatus: "projStatus",
  };

  for (const key in params) {
    if (
      params.hasOwnProperty(key) &&
      params[key] !== null &&
      params[key] !== undefined
    ) {
      if (Array.isArray(params[key])) {
        // If the value is an array, join its elements with ","
        queryParams.push(`${paramMappings[key]}=${params[key].join(",")}`);
      } else {
        // Convert the value to crores or lakhs if necessary
        let value = params[key];
        if (key === "minPrice" || key === "maxPrice") {
          value *= 10000000;
        }
        // Otherwise, add the key-value pair directly
        queryParams.push(`${paramMappings[key]}=${value}`);
      }
    }
  }

  return queryParams.join("&");
};

const createRequestParams = (params: Params): Params => {
  const requestParams: Params = {};

  for (const key in params) {
    if (
      params.hasOwnProperty(key) &&
      params[key] !== null &&
      params[key] !== undefined
    ) {
      requestParams[key] = params[key];
    }
  }

  return requestParams;
};

export { convertToQueryParams, createRequestParams };
