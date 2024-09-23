import { NextResponse } from "next/server";
export async function GET() {
  try {
    const data = await getCityStateFromIP("192.168.45.123");
    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Error reading file" });
  }
}
const axios = require("axios");

async function getCityStateFromIP(ip: string) {
  try {
    const response = await axios.get(`https://get.geojs.io/v1/ip/geo.json`);
    console.log(response);
    const { city, region } = response.data;
    return { city, state: region };
  } catch (error) {
    console.error("Error fetching IP data:", error);
    return null;
  }
}
