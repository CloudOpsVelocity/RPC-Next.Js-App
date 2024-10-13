import { NextResponse } from "next/server";
export async function POST(req: Request) {
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
    if(process.env.NODE_ENV === "development"){
        let testData ={city:9,state:11}
        return NextResponse.json({cityStateId: testData, status: true ,msg:"comgin from development"});
    }
  const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
  try {
    if (!ip) {
      return NextResponse.json({ ok: false, error: "IP not found" });
    }
    const data = await getCityStateFromIP(ip);
    const cityStateId = await getCityStateIdFromDb(data.region, data.city);
    return NextResponse.json({ cityStateId, status: true });
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
async function getCityStateIdFromDb(state: string, city: string) {
    console.log(state,city)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/get-city-state/ip?city=Bengaluru&state=Karnataka`
  );
  const data = await res.json();
  return data;
}
