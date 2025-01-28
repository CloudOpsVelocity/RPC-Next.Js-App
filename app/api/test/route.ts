import axios from "axios";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import redis from "@/app/utils/redis/redis.config";

export async function GET(req: Request, res: NextResponse) {
  try {
    // const data = await getAllData();
    return NextResponse.json({ status: true, data: "'hello'" });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Error reading file" });
  }
}

export const getAllData = async () => {
  const data = await redis.get("NEXT_JS");
  return data;
};
