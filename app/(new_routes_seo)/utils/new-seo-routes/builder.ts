import fs from "fs";
import path from "path";
export async function findPathForBuilderDetails(inputUrl: string) {
  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "builderSlugs.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const builderJsonData = JSON.parse(jsonData);
  for (const path in builderJsonData) {
    if (path.startsWith(inputUrl)) {
      return builderJsonData[path];
    }
  }
  return null;
}
