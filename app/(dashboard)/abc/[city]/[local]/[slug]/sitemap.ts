import axios from "axios";
import { MetadataRoute } from "next";

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const slugs = await getParams();
  return slugs.map((slug: any) => ({
    url: `${process.env.NEXT_PUBLIC_PROJECT_URL}/banglore/whitefield/${slug}`,
    lastModified: new Date(),
  }));
}
async function getParams() {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/all/active/ids?identifier=project`;
  let data = await axios.get(url);
  return data.data;
}
