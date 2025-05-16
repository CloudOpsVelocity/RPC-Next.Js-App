/* eslint-disable no-unused-vars */
import axios from "axios";

export const getSearchData = async (page = 0, apiFilterQueryParams: string) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?page=${page}`;
  if (apiFilterQueryParams.includes("listedBy")) {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search?page=${page}`;
  }
  let queryparams = parseApiFilterQueryParams(apiFilterQueryParams);
  const res = await fetch(`${url}${queryparams ? `&${queryparams}` : ""}`, {
    cache: "no-store",
  });
  return await res.json();
};
export const getListingSearchData = async (
  page = 0,
  apiFilterQueryParams: string
) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search?page=${page}`;
  if (apiFilterQueryParams.includes("listedBy=proj")) {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?page=${page}`;
    let queryparams = parseApiFilterQueryParams(apiFilterQueryParams);
    const res = await axios.get(
      `${url}${queryparams ? `&${queryparams}` : ""}`
    );
    return res.data;
  }
  let queryparams = parseApiFilterQueryParams(apiFilterQueryParams);

  const res = await axios.get(`${url}${queryparams ? `&${queryparams}` : ""}`);
  return res.data;
};

export const parseApiFilterQueryParams = (
  apiFilterQueryParams: string
): string => {
  const transformedParams = apiFilterQueryParams
    .replace(/bugdetValue/gi, "budget") // Replace keys using hardcoded pattern
    .replace(/budget=(\d+),(\d+)/, "minPrice=$1&maxPrice=$2") // Budget transformation
    .replace(/areaValue=(\d+),(\d+)/, "minArea=$1&maxArea=$2")
    .replace(
      /(localities|builderIds|phaseId)=([^&]+)/g,
      (_, key, value) =>
        `${key}=${value
          .split(",")
          .map((part: any) => part.split("+")[1])
          .filter(Boolean)
          .join(",")}`
    )
    .replace(
      /city=([^\s&]*)(\+(\d+))?/,
      (_, baseCity, __) => `city=${baseCity.split("+")[1] ?? "9"}`
    )
    .replace(/listedBy=All/g, "") // Remove 'listedBy=All'
    .replace(/-/g, "&"); // Replace dashes with ampersands
  let updatedParams = apiFilterQueryParams.includes("cg=")
    ? transformedParams
    : `${transformedParams}&cg=S`;

  return updatedParams.includes("city=")
    ? updatedParams
    : `${updatedParams}&city=9`;
};
// export const parseApiFilterQueryParams = (
//   apiFilterQueryParams: string
// ): string => {
//   const keyValuePairs: Record<string, string> = {};

//   // Step 1: Replace "-" with "&", split into key=value
//   const rawParams = apiFilterQueryParams.replace(/-/g, "&").split("&");

//   for (const pair of rawParams) {
//     const [key, value] = pair.split("=");

//     if (!key || !value) continue;

//     keyValuePairs[key] = keyValuePairs[key]
//       ? `${keyValuePairs[key]},${value}`
//       : value;
//   }

//   // Step 2: Transformation logic using a config object
//   const transformers: Record<
//     string,
//     (value: string) => string | string[] | null
//   > = {
//     bugdetValue: (value) => {
//       const [min, max] = value.split(",");
//       return [`minPrice=${min}`, `maxPrice=${max}`];
//     },
//     areaValue: (value) => {
//       const [min, max] = value.split(",");
//       return [`minArea=${min}`, `maxArea=${max}`];
//     },
//     localities: (value) => {
//       const ids = value
//         .split(",")
//         .map((v) => v.split("+")[1])
//         .filter(Boolean);
//       return ids.length ? `localities=${ids.join(",")}` : null;
//     },
//     builderIds: (value) => {
//       const ids = value
//         .split(",")
//         .map((v) => v.split("+")[1])
//         .filter(Boolean);
//       return ids.length ? `builderIds=${ids.join(",")}` : null;
//     },
//     phaseId: (value) => {
//       console.log({ value });
//       const ids = value
//         .split(",")
//         .map((v) => v.split("+").at(-1))
//         .filter(Boolean);
//       return ids.length ? `phaseId=${ids.join(",")}` : null;
//     },
//     city: (value) => {
//       const cityId = value.split("+")[1] ?? "9";
//       return `city=${cityId}`;
//     },
//     listedBy: (value) => {
//       return value === "All" ? null : `listedBy=${value}`;
//     },
//   };

//   const result: string[] = [];

//   for (const [key, value] of Object.entries(keyValuePairs)) {
//     const transformer = transformers[key];
//     if (transformer) {
//       const transformed = transformer(value);
//       if (Array.isArray(transformed)) {
//         result.push(...transformed);
//       } else if (transformed) {
//         result.push(transformed);
//       }
//     } else {
//       result.push(`${key}=${value}`);
//     }
//   }

//   // Ensure defaults
//   if (!result.some((p) => p.startsWith("cg="))) result.push("cg=S");
//   if (!result.some((p) => p.startsWith("city="))) result.push("city=9");
//   console.log({ result });
//   return "";
//   return result.join("&");
// };
