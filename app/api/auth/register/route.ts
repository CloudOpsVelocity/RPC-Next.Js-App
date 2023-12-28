import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const registrationResponse = await axios.post(
    "http://localhost:8081/user/v1/registerUser",
    data
  );
  return Response.json(registrationResponse.data);
}
