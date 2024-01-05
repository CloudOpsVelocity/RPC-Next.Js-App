import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const registrationResponse = await axios.post(
      `${process.env.BACKEND_URL}/user/v1/registerUser`,
      data
    );
    return Response.json(registrationResponse.data);
  } catch (error) {
    console.log(error);
  }
}
