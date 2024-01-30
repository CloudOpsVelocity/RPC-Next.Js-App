import axios from "axios";

export async function GET(req: Request) {
  const params = new URLSearchParams(req.url.split("?")[1]);
  const lat = params.get("lt");
  const lng = params.get("lng");
  const type = params.get("type");
  const travelType = params.get("travelType");
  console.log(travelType);

  if (!lat || !lng || !type) {
    // Handle the case where 'lt', 'lng', or 'type' is not provided
    return Response.json({
      error: "Latitude, Longitude, and Type are required parameters",
    });
  }

  // Define a mapping of types to corresponding keyword values
  const typeMappings: Record<string, string> = {
    commute: "public transport",
    train: "train station",
    bus: "bus station",
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
  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=${keyword}&keyword=${keyword}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;

  const res = await axios.get(url);

  const distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&units=imperial&origins=${lat},${lng}&destinations=${res.data.results
    .map(
      (place: any) =>
        `${place.geometry.location.lat},${place.geometry.location.lng}`
    )
    .join("|")}&mode=${travelType?.toLowerCase()}&key=${
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  }`;
  const distanceRes = await axios.get(distanceUrl);
  console.log(distanceRes.data);

  const combinedData = res.data.results.map((place: any, index: number) => {
    return {
      name: place.name,
      geometry: place.geometry,
      vicinity: place.vicinity,
      distance: distanceRes.data.rows[0].elements[index].distance,
      duration: distanceRes.data.rows[0].elements[index].duration,
    };
  });
  // console.log(combinedData);
  // console.log("jhfhghdfghdcgfxdgfxdfgsxfg==========" + JSON.stringify(distanceRes.data));
  return Response.json({
    ...combinedData,
    // ...res.data.results,
    // abc: combinedData,
  });
}
