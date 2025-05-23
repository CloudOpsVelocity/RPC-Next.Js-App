// app/api/download-brochure/route.ts
import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const filename = searchParams.get("filename");
  if (!url) return new Response("Missing URL", { status: 400 });

  try {
    const axiosResponse = await axios.get(url, {
      responseType: "stream",
    });

    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set(
      "Content-Disposition",
      `attachment; filename="${filename}.pdf"`
    );

    return new Response(axiosResponse.data as any, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.error("Download error:", error.message);
    return new Response("Failed to download PDF", { status: 500 });
  }
}
