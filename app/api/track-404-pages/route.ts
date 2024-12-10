import { getPagesSlugs } from "@/app/seo/api";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  console.log(type);
  let response: {
    builderRoutes: string[];
    listingRoutes: string[];
    projectRoutes: string[];
  } = {
    builderRoutes: [],
    listingRoutes: [],
    projectRoutes: [],
  };
  switch (type) {
    case "B":
      {
        // Read all slug files
        const builderSlugs = await getPagesSlugs("builder-list");
        const builderPaths = Object.keys(builderSlugs);
        for (const path of builderPaths) {
          const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`;
          const res = await fetch(url, {
            cache: "no-cache",
          });
          if (res.status === 404) {
            response.builderRoutes.push(path);
          }
        }
      }
      return NextResponse.json(response);

    case "L":
      {
        const listingSlugs = await getPagesSlugs("listing-search-seo");
        const listingPaths = Object.keys(listingSlugs);
        for (const path of listingPaths) {
          const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`;
          const res = await fetch(url);
          if (res.status === 404) {
            response.listingRoutes.push(path);
          }
        }
      }
      return NextResponse.json(response);
    case "P":
      {
        const projectSlugs = await getPagesSlugs("project-list");
        const projectPaths = Object.keys(projectSlugs);
        for (const path of projectPaths) {
          const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`;
          const res = await fetch(url);
          if (res.status === 404) {
            response.projectRoutes.push(path);
          }
        }
      }
      return;
    default:
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
}
