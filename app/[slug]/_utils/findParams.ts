import path from "path";
import fs from "fs";
import logger from "@/app/utils/logger";
import { headers } from "next/headers";

export async function findSeoParams(inputUrl: string) {
  console.time("dynamic");
  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "case-seo.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const builderJsonData = JSON.parse(jsonData);
  for (const path in builderJsonData) {
    if (path == inputUrl) {
      logger.info(`Found path: ${path} ${inputUrl}`);
      return builderJsonData[path];
    }
  }
  console.timeEnd("dynamic" + headers().get("x-ip"));
  return null;
}
export const extractCaseSeoParams = (input: string) => {
  const result: { [key: string]: string | number } = {};

  // Split the input into segments based on the underscore "_"

  const segments = input?.split("_");

  // Initialize count
  let propertyCount = 0;

  // Process each segment
  for (const segment of segments) {
    // Check if the segment contains "%"
    const starIndex = segment.indexOf("%");
    if (starIndex !== -1) {
      // If it also contains "+", split by "+"
      const plusIndex = segment.indexOf("+");
      if (plusIndex !== -1) {
        const pairs = segment.split("+");
        for (const pair of pairs) {
          const [value, key] = pair.split("%");
          if (key) {
            if (!result[key]) {
              propertyCount++;
            }
            result[key] = value;
          }
        }
      } else {
        // Process single key-value pair
        const value = segment.substring(0, starIndex);
        const key = segment.substring(starIndex + 1);
        if (key) {
          if (!result[key]) {
            propertyCount++;
          }
          result[key] = value;
        }
      }
    } else {
      propertyCount++;
      // Assign the segment as the ID if no "%" is found
      result["id"] = segment;
    }
  }

  // Add the count of properties to the result
  result["count"] = propertyCount;

  return result;
};
