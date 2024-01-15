import axios from "axios";

export async function GET(req: Request) {
  const P = new URLSearchParams(req.url.split("?")[1]);
  const lat = P.get("lt");
  const lng = P.get("lng");
  const res = await axios.get(
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=13.0318336,77.55137057690479&radius=1500&key=AIzaSyAixodyrLHoHQ5DTM95QMAXtlITIu8zgLs"
  );
  return Response.json({
    ok: {
      lat,
      lng,
    },
  });
}
