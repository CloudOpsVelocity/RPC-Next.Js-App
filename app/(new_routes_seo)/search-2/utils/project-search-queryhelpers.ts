import axios from "axios";

export const getSearchData = async (page = 0, apiFilterQueryParams: string) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?page=${page}`;
  if (apiFilterQueryParams.includes("listedBy")) {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search?page=${page}`;
  }
  let queryparams = parseApiFilterQueryParams(apiFilterQueryParams);
  const res = await axios.get(`${url}${queryparams ? `&${queryparams}` : ""}`);
  return res.data;
};
export const getListingSearchData = async (
  page = 0,
  apiFilterQueryParams: string
) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search?page=${page}`;
  let queryparams = parseApiFilterQueryParams(apiFilterQueryParams);
  const res = await axios.get(`${url}${queryparams ? `&${queryparams}` : ""}`);
  return res.data;
};

const parseApiFilterQueryParams = (apiFilterQueryParams: string): string => {
  const changedParams: Record<string, string> = {
    bugdetValue: "budget",
  };

  // Precompile regex patterns
  const changedParamsRegex = new RegExp(
    Object.keys(changedParams).join("|"),
    "gi"
  );
  const budgetRegex = /budget=(\d+),(\d+)/;
  const localityBuilderRegex = /(localities|builderIds)=([^&]+)/g;
  const cityRegex = /city=[^\s&]*\+?(\d+)?/;
  // Use a single pass to handle most transformations
  let transformedParams = apiFilterQueryParams
    .replace(changedParamsRegex, (match) => changedParams[match]) // Key replacements
    .replace(budgetRegex, (_, min, max) => `minPrice=${min}&maxPrice=${max}`) // Budget transformation
    .replace(localityBuilderRegex, (_, key, value) => {
      // Locality and builderIds processing
      const ids = value
        .split(",")
        .map((part: string) => part.split("+")[1])
        .filter(Boolean)
        .join(",");
      return `${key}=${ids}`;
    });

  // Handle city transformation and default addition
  if (cityRegex.test(transformedParams)) {
    transformedParams = transformedParams.replace(
      cityRegex,
      (_, cityId) => `city=${cityId || "9"}`
    );
  } else {
    transformedParams += "&city=9";
  }

  // Final cleanup
  return transformedParams.replace(/-/g, "&").replace("listedBy=All", "");
};
