import path from "path";
import fs from "fs";
import { notFound } from "next/navigation";
export const extractProjectParamsValues = (input: string) => {
  const result: { [key: string]: string | number } = {};

  // Split the input into segments based on the underscore "_"
  const segments = input?.split("_");

  // Initialize count
  let propertyCount = 0;

  // Process each segment
  for (const segment of segments) {
    // Check if the segment contains "*"
    const starIndex = segment.indexOf("*");
    if (starIndex !== -1) {
      // If it also contains "+", split by "+"
      const plusIndex = segment.indexOf("+");
      if (plusIndex !== -1) {
        const pairs = segment.split("+");
        for (const pair of pairs) {
          const [value, key] = pair.split("*");
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
      // Assign the segment as the ID if no "*" is found
      result["id"] = segment;
    }
  }

  // Add the count of properties to the result
  result["count"] = propertyCount;

  return result;
};
export async function findPathForProjectDetails(inputUrl: string) {
  console.time("findPathForProjectDetails");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/slugs?type=P`,
    {
      next: { tags: ["projectSlugs"] },
    }
  );
  const builderJsonData = await res.json();
  console.timeEnd("findPathForProjectDetails");
  if (builderJsonData[inputUrl]) {
    return builderJsonData[inputUrl];
  }
  notFound();
  return null;
}
