import { NextResponse } from "next/server";
export async function POST(req: Request) {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.json({
      data: { city: "Bengaluru", state: "Karnataka" },
      msg: "comgin from development",
    });
  }

  const data = await req.json();
  console.log(data);
  const ip =
    data?.ip ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for");
  try {
    if (!ip) {
      return NextResponse.json({ ok: false, error: "IP not found" });
    }
    const data = await getCityStateFromIP(ip);
    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Error reading file" });
  }
}
export async function GET(req: Request) {
  const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
  try {
    if (!ip) {
      return NextResponse.json({ ok: false, error: "IP not found" });
    }
    const data = await getCityStateFromIP(ip);
    return NextResponse.json({ data, status: true });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Error reading file" });
  }
}
const axios = require("axios");

async function getCityStateFromIP(ip: string) {
  try {
    const response = await axios.get(`https://get.geojs.io/v1/ip/geo/${ip}.json
`);
    return response.data;
  } catch (error) {
    console.error("Error fetching IP data:", error);
    return null;
  }
}
