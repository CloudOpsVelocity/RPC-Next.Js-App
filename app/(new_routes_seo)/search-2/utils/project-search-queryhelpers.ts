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
  const changedParams: Record<string, string> = { bugdetValue: "budget" };

  // Directly process the input string in a single pass
  const transformedParams = apiFilterQueryParams
    .replace(/bugdetValue/gi, "budget") // Replace keys using hardcoded pattern
    .replace(/budget=(\d+),(\d+)/, "minPrice=$1&maxPrice=$2") // Budget transformation
    .replace(
      /(localities|builderIds)=([^&]+)/g,
      (_, key, value) =>
        `${key}=${value
          .split(",")
          .map((part: any) => part.split("+")[1])
          .filter(Boolean)
          .join(",")}`
    )
    .replace(
      /city=([^\s&]*)(\+(\d+))?/,
      (_, baseCity, __, cityId) => `city=${baseCity.split("+")[1] ?? "9"}`
    )
    .replace(/listedBy=All/g, "") // Remove 'listedBy=All'
    .replace(/-/g, "&"); // Replace dashes with ampersands

  // Append 'cg=S' if not already present
  return transformedParams.includes("cg=")
    ? transformedParams
    : `${transformedParams}&cg=S`;
};
