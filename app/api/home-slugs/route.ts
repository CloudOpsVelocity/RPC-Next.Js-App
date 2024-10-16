import { getAllCitiesDetails } from "@/app/utils/stats_cities";
import { NextResponse } from "next/server";

// Centralized function to map URLs based on city details and type
function mapUrls(cities: Array<{ name: string, id: string | number }>, type: string): { [key: string]: string | number } {
  return cities.reduce((acc, item) => {
    const normalizedCityName = item.name.toLowerCase().replace(/\s+/g, "-"); // Normalize city name for URL
    const id = item.id; // Assuming id is a number or string that represents the city
    if (type === "project") {
      acc[`/projects/new-projects-in-${normalizedCityName}`] = id;
      acc[`/projects/new-affordable-projects-in-${normalizedCityName}`] = id;
      acc[`/projects/upcoming-residential-projects-in-${normalizedCityName}`] = id;
    } else if (type === "property") {
      acc[`/properties/for-sale-in-${normalizedCityName}/properties-for-sale-residential-in-${normalizedCityName}`] = id;
      acc[`/properties/for-rent-in-${normalizedCityName}/properties-for-rent-residential-in-${normalizedCityName}`] = id;
    } else {
      console.error(`Invalid type: ${type}`); // Log an error for invalid type
    }
    return acc;
  }, {} as  { [key: string]: string | number }); // Flatten and filter out null values
}       

export async function POST(req: Request) {
  const { type } = await req.json();
  try {
    const cities = await getAllCitiesDetails(); // Fetch all cities
    const mappedUrls = mapUrls(cities, type); // Call the centralized function

    console.log(mappedUrls); // Check the output in the console

    return NextResponse.json({
      data: mappedUrls,
      count: mappedUrls.length,
      status: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: "Error reading file" });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // Get the 'type' query parameter

  try {
    const cities = await getAllCitiesDetails(); // Fetch all cities
    const mappedUrls = mapUrls(cities, type || ''); // Call the centralized function with a default value for type

    console.log(mappedUrls); // Log the output to the console

    return NextResponse.json({
      data: mappedUrls,
      count: mappedUrls.length,
      status: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: "Error reading file" });
  }
}
