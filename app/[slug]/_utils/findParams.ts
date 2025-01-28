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
      console.log(path, inputUrl);
      // logger.info(`Found path: ${path} ${inputUrl}`);
      return builderJsonData[path];
    }
  }

  return null;
}
export function extractCaseSeoParams(values: string) {
  const result: any = {};
  let count = 0;

  // Split the string by hyphens to get parts like ['683B', 'RCG', '482L', '9C']
  const parts = values.split("-");

  // Iterate through each part to extract the numeric value and the corresponding letter
  parts.forEach((part) => {
    const number = part.replace(/[A-Za-z]/g, ""); // Extract the numeric value
    const letter = part.replace(/[0-9]/g, ""); // Extract the alphabetic part

    if (letter === "B") {
      result.B = number; // B for BHK
      count++;
    } else if (letter === "RCG" || letter === "R") {
      result.CG = letter.charAt(0); // First character of RCG for CG
      count++;
    } else if (letter === "C") {
      result.C = number; // C for City (numeric part)
      count++;
    } else if (letter === "L") {
      result.L = number; // L for Locality
      count++;
    } else if (letter === "P") {
      result.P = number;
      count++;
    }
  });

  return { ...result, count };
}
