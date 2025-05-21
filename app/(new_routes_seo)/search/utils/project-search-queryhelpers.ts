/* eslint-disable no-unused-vars */
import axios from "axios";

export const getSearchData = async (
  page = 0,
  apiFilterQueryParams: string,
  serverFilterApplied?: string
) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?page=${page}`;
  if (apiFilterQueryParams?.includes("listedBy")) {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search?page=${page}`;
  }
  let queryparams = serverFilterApplied
    ? serverFilterApplied
    : parseApiFilterQueryParams(apiFilterQueryParams);
  const res = await fetch(`${url}${queryparams ? `&${queryparams}` : ""}`, {
    cache: "no-store",
  });
  return await res.json();
};

export const getListingSearchData = async (
  page = 0,
  apiFilterQueryParams: string,
  serverFilterApplied?: string
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
  let queryparams = serverFilterApplied
    ? serverFilterApplied
    : parseApiFilterQueryParams(apiFilterQueryParams);

  const res = await axios.get(`${url}${queryparams ? `&${queryparams}` : ""}`);
  return res.data;
};

// export const parseApiFilterQueryParams = (
//   apiFilterQueryParams: string
// ): string => {
//   const transformedParams = apiFilterQueryParams
//     .replace(/bugdetValue/gi, "budget") // Replace keys using hardcoded pattern
//     .replace(/budget=(\d+),(\d+)/, "minPrice=$1&maxPrice=$2") // Budget transformation
//     .replace(/areaValue=(\d+),(\d+)/, "minArea=$1&maxArea=$2")
//     .replace(
//       /(localities|builderIds|phaseId)=([^&]+)/g,
//       (_, key, value) =>
//         `${key}=${value
//           .split(",")
//           .map((part: any) => part.split("+")[1])
//           .filter(Boolean)
//           .join(",")}`
//     )
//     .replace(
//       /city=([^\s&]*)(\+(\d+))?/,
//       (_, baseCity, __) => `city=${baseCity.split("+")[1] ?? "9"}`
//     )
//     .replace(/listedBy=All/g, "") // Remove 'listedBy=All'
//     .replace(/-/g, "&"); // Replace dashes with ampersands
//   let updatedParams = apiFilterQueryParams.includes("cg=")
//     ? transformedParams
//     : `${transformedParams}&cg=S`;

//   return updatedParams.includes("city=")
//     ? updatedParams
//     : `${updatedParams}&city=9`;
// };
export const parseApiFilterQueryParams = (
  apiFilterQueryParams: string
): string => {
  const queryParts: string[] = [];
  const rawParams = apiFilterQueryParams.split("-");
  let hasCity = false;
  let hasCg = false;

  for (const pair of rawParams) {
    const [key, value] = pair.split("=");
    if (!key || !value) continue;

    switch (key) {
      case "bugdetValue":
        {
          const [min, max] = value.split(",");
          if (min) queryParts.push(`minPrice=${min}`);
          if (max) queryParts.push(`maxPrice=${max}`);
        }
        break;
      case "areaValue":
        {
          const [min, max] = value.split(",");
          if (min) queryParts.push(`minArea=${min}`);
          if (max) queryParts.push(`maxArea=${max}`);
        }
        break;
      case "localities":
        {
          const ids = value
            .split(",")
            .map((v) => v.split("+")[1])
            .filter(Boolean);
          if (ids.length) queryParts.push(`localities=${ids.join(",")}`);
        }
        break;
      case "builderIds":
        {
          const ids = value
            .split(",")
            .map((v) => v.split("+")[1])
            .filter(Boolean);
          if (ids.length) queryParts.push(`builderIds=${ids.join(",")}`);
        }
        break;
      case "phaseId":
        {
          const ids = value
            .split(",")
            .map((v) => v.split("+").at(-1))
            .filter(Boolean);
          if (ids.length) queryParts.push(`phaseId=${ids.join(",")}`);
        }
        break;
      case "city":
        {
          const cityId = value.split("+")[1] ?? "9";
          queryParts.push(`city=${cityId}`);
          hasCity = true;
        }
        break;
      case "listedBy":
        {
          if (value !== "All") {
            queryParts.push(`listedBy=${value}`);
          }
          // Do nothing if value is 'All'
        }
        break;
      case "cg":
        {
          queryParts.push(`cg=${value}`);
          hasCg = true;
        }
        break;
      default: {
        queryParts.push(`${key}=${value}`);
      }
    }
  }

  // Add missing 'cg=S' if not present
  if (!hasCg) {
    queryParts.push("cg=S");
  }

  // Add default city=9 if not present
  if (!hasCity) {
    queryParts.push("city=9");
  }

  return queryParts.join("&");
};

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
