// utils/new_routes_seo/generateSlugs.ts

import { getPagesSlugs } from "@/app/seo/api";
import path from "path";
import fs from "fs";

type SlugParams = {
  emptyPath?: string;
  country?: string;
  cg?: string;
  city?: string;
  lt?: string;
  bhk_unit_type?: string;
  slug?: string;
};

// Cache Map
const cache = new Map<string, string[]>();

export async function generateSlugs(
  slugType: "builder-list" | "project-list" | "case-seo" | "listing-search-seo",
  start: number = 0,
  end?: number
): Promise<Partial<SlugParams>[]> {
  // Check if keys are cached
  let keys = cache.get(slugType);

  if (!keys) {
    const res = await getPagesSlugs(slugType);
    // Fetch data and cache the keys
    const staticDir = path.join(process.cwd(), "static");
    const filePath = path.join(staticDir, "listingSlugs.json");
    // Ensure the 'static' directory exists
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir);
    }
    // Convert the data object into JSON
    const jsonContent = JSON.stringify(res, null, 2);
    // Write the JSON data to the file
    fs.writeFileSync(filePath, jsonContent);
    keys = Object.keys(res);
    cache.set(slugType, keys);
  }
  // Map through the sliced keys and return the parameters
  const slugs: Partial<SlugParams>[] = keys.map((data) => {
    const [emptyPath, country, , cg, city, lt, bhk_unit_type, slug] =
      data.split("/");
    const result: Partial<SlugParams> = {
      cg,
      city,
      lt,
      bhk_unit_type,
      slug,
    };

    return result;
  });

  return slugs;
}
