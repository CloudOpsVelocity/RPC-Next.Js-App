// import data from "@/permutations.json";
import generatePermutations from "./create";
export async function POST(req: Request) {
  const data = await generatePermutations();
  return Response.json({ data: true });
}

export async function GET(req: Request) {
  return Response.json({ data: 1 });
}
