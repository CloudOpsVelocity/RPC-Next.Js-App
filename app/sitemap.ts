const fs = require("fs");

export default async function sitemap() {
  const BASE_PATH = process.env.NEXT_PUBLIC_URL;
  // const [projects, property] = await Promise.all([
  //   getUrlSlugs("project"),
  //   getUrlSlugs("listing"),
  // ]);
  // const projectsLinks = projects.projResult.map((id: string) => ({
  //   url: `${BASE_PATH}/abc/banglore/whitefield/${id}`,
  //   lastModified: new Date(),
  //   changeFrequency: "weekly",
  //   priority: 0.5,
  // }));
  // const propertyLinks = property.propResult.map((id: string) => ({
  //   url: `${BASE_PATH}/listing/banglore/${id}`,
  //   lastModified: new Date(),
  //   changeFrequency: "weekly",
  //   priority: 1,
  // }));
  /*
  ####### NEED TO ADD A STATIC PAGE WHERE WE WILL MENTION THE PROJECTS
  + builder details need to create url
  + post listing 
  + post project
  + project => city state locality // also need to create url for project url
  + listing => city locality
  + dashboard => /my-profile
  */
  const projResult = readJsonFile("./permutations.json");
  const projectsLinks = projResult.map(({ slug }: any) => ({
    url: `${BASE_PATH}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));
  return [
    {
      url: `${BASE_PATH}/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${BASE_PATH}/search`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_PATH}/search/listing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_PATH}/builder/ramu`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_PATH}/project/postProject`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_PATH}/post-listing/v1/post`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...projectsLinks,
  ];
}
function readJsonFile(fileName: string) {
  try {
    const data = fs.readFileSync(fileName, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading or parsing file: ${err}`);
    return null;
  }
}
