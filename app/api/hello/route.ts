import axios from "axios";

export async function GET(req: Request) {
  const params = new URLSearchParams(req.url.split("?")[1]);
  const lat = params.get("lt");
  const lng = params.get("lng");
  const type = params.get("type");

  if (!lat || !lng || !type) {
    // Handle the case where 'lt', 'lng', or 'type' is not provided
    return Response.json({
      error: "Latitude, Longitude, and Type are required parameters",
    });
  }

  // Define a mapping of types to corresponding keyword values
  const typeMappings: Record<string, string> = {
    commute: "commute",
    train: "train_station",
    bus: "bus_station",
    hospital: "hospital",
    school: "school",
    market: "supermarket",
    restaurant: "restaurant",
    bank: "bank",
    clinic: "clinic",
  };

  const keyword = typeMappings[type];

  if (!keyword) {
    // Handle the case where an invalid type is provided
    return Response.json({ error: "Invalid type specified" });
  }

  // Use the extracted parameters in the API call
  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&type=${keyword}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
  );

  return Response.json({
    ...res.data.results,
  });
}
