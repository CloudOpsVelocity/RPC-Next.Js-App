import path from "path";
import fs from "fs";

type Type = "property" | "project";
const getPageSlugs = async (type: Type) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home-slugs`,
    {
      method: "POST",
      body: JSON.stringify({ type }),
    }
  );
  const data = await res.json();
  return data.data;
};
// Cache Map
const cache = new Map<string, string[]>();

export async function generateHomePageSlugs(slugType: Type): Promise<any> {
  // Check if keys are cached
  let keys = cache.get(slugType);

  if (!keys) {
    const res = await getPageSlugs(slugType);
    // Fetch data and cache the keys
    const staticDir = path.join(process.cwd(), "static");
    const filePath = path.join(staticDir, "home.json");
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
  const slugs = keys.map((data) => {
    return data;
  });

  return slugs;
}
