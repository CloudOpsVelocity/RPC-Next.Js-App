import axios from "axios";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // const slugs = getParams();
  // return slugs?.map((slug: string) => ({
  //   url: `${process.env.NEXT_PUBLIC_PROJECT_URL}/abc/banglore/whitefield/${slug}`,
  //   lastModified: new Date(),
  //   changeFrequency: "daily",
  //   priority: 1,
  // }));
  return [
    {
      url: "https://acme.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://acme.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://acme.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}
async function getParams(): Promise<string[]> {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/all/active/ids?identifier=project`;
  let data = await axios.get(url);
  return data.data;
}
