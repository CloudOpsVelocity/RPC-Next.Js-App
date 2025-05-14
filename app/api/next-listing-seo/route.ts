import { BACKEND_BASE_URL } from "@/app/env";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const urls = [  
      `${BACKEND_BASE_URL}/common/listing-search-seo-uniqe`,
      `${BACKEND_BASE_URL}/common/listing-search-seo`,
    ];

    const [unique, pages] = await Promise.all(
      urls.map((url) =>
        fetch(url, {
          method: "POST",
        }).then((res) => res.json())
      )
    );
    let results = {
      status:true,
      urlMap:{
        ...unique.urlMap,
        ...pages.urlMap,
      }
    };
    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return Response.json({ status: false, error: "Error reading file" });
  }
}
