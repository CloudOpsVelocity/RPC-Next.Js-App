import path from "path";
import fs from "fs";
import logger from "@/app/utils/logger";
import { headers } from "next/headers";

let seoLookup: Map<string, any> | null = null;

export async function findSeoParams(inputUrl: string) {
  console.time("dynamic");

  // Load the data into a Map if not already done
  if (!seoLookup) {
    const staticDir = path.join(process.cwd(), "static");
    const filePath = path.join(staticDir, "case-seo.json");

    // Read and parse the JSON file
    const jsonData = fs.readFileSync(filePath, "utf8");
    const builderJsonData = JSON.parse(jsonData);

    if (!Array.isArray(builderJsonData)) {
      throw new Error("Invalid JSON format: Expected an array");
    }

    // Convert the array into a Map for faster lookups
    seoLookup = new Map(builderJsonData.map((item: string) => [item, item]));
  }

  // Use the Map for constant-time lookup
  const result = seoLookup.get(inputUrl);

  console.timeEnd("dynamic");
  return result || null;
}
// export const extractCaseSeoParams = (input: string) => {
//   const result: { [key: string]: string | number } = {};

//   // Split the input into segments based on the underscore "_"

//   const segments = input?.split("_");

//   // Initialize count
//   let propertyCount = 0;

//   // Process each segment
//   for (const segment of segments) {
//     // Check if the segment contains "%"
//     const starIndex = segment.indexOf("%");
//     if (starIndex !== -1) {
//       // If it also contains "+", split by "+"
//       const plusIndex = segment.indexOf("+");
//       if (plusIndex !== -1) {
//         const pairs = segment.split("+");
//         for (const pair of pairs) {
//           const [value, key] = pair.split("%");
//           if (key) {
//             if (!result[key]) {
//               propertyCount++;
//             }
//             result[key] = value;
//           }
//         }
//       } else {
//         // Process single key-value pair
//         const value = segment.substring(0, starIndex);
//         const key = segment.substring(starIndex + 1);
//         if (key) {
//           if (!result[key]) {
//             propertyCount++;
//           }
//           result[key] = value;
//         }
//       }
//     } else {
//       propertyCount++;
//       // Assign the segment as the ID if no "%" is found
//       result["id"] = segment;
//     }
//   }

//   // Add the count of properties to the result
//   result["count"] = propertyCount;

//   return result;
// };

export function extractCaseSeoParams(values: string) {
  const result: any = {};

  // Split the string by hyphens to get parts like ['683B', 'RCG', '482L', '9C']
  const parts = values.split("-");

  // Iterate through each part to extract the numeric value and the corresponding letter
  parts.forEach((part) => {
    const number = part.replace(/[A-Za-z]/g, ""); // Extract the numeric value
    const letter = part.replace(/[0-9]/g, ""); // Extract the alphabetic part

    if (letter === "B") {
      result.B = number; // B for BHK
    } else if (letter === "RCG" || letter === "R") {
      result.CG = letter.charAt(0); // First character of RCG for CG
    } else if (letter === "C") {
      result.C = number; // C for City (numeric part)
    } else if (letter === "L") {
      result.L = number; // L for Locality
    } else if (letter === "P") {
      result.P = number;
    }
  });
  console.log(result);
  return result;
}
