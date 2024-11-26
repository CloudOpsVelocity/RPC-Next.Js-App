import axios from "axios";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const data = await axios.get(`https://internal.getrightproperty.com/api/youtube/oauth2/callback?code=4%2F0AeanS0bv-uWP-r3f7BXQwHSr8f1U_NTtisN8HhVTmFzDvOxztLzjKwTxtyfFe6hWhfvUEg&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.upload+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly`)
    return NextResponse.json({ data, status: true });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Error reading file" });
  }
}



