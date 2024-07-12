import fs from "fs";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const data = fs.appendFileSync("test.txt", `${new Date()}\n`, {
      encoding: "utf-8",
    });
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Error reading file" });
  }
}
