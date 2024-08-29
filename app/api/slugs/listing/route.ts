import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const getFilePath = () =>
  path.join(process.cwd(), "static", "listingSlugs.json");

export async function POST(request: Request) {
  let { slug, id, action, data: input } = await request.json();
  // samplem input = inoput:{key:value,key:value}
  // Validate required parameters
  if (!action) {
    return NextResponse.json(
      { error: "Missing action parameter" },
      { status: 400 }
    );
  }

  const filePath = getFilePath();

  // Ensure the file exists
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}));
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);

  switch (action) {
    case "create":
      if (!input) {
        return NextResponse.json(
          { error: "data is required" },
          { status: 400 }
        );
      }

      // Loop through the input object to check if it already exists or not
      for (const key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key)) {
          const element = input[key];

          // Check if the key (slug) already exists in JSON data
          if (data.hasOwnProperty(key)) {
            return NextResponse.json(
              { error: `Listing for slug '${key}' already exists` },
              { status: 400 }
            );
          }

          // If the slug does not exist, create it with the provided id
          data[key] = element;
        }
      }

      // Write the updated data back to the file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      // Revalidate paths for all created slugs
      for (const key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key)) {
          revalidatePath(key);
        }
      }

      return NextResponse.json(
        { message: `Listing(s) created successfully`, input },
        { status: 201 }
      );
      break;
    case "update":
      if (!id || !input) {
        return NextResponse.json(
          { error: "Missing id or data parameter" },
          { status: 400 }
        );
      }

      // Find the slug corresponding to the given id
      const currentSlug = Object.keys(data).find((key) => data[key] === id);

      if (!currentSlug) {
        return NextResponse.json(
          { error: `Listing with id '${id}' does not exist` },
          { status: 404 }
        );
      }
      for (const key in data) {
        if (data[key] === id) {
          delete data[key];
        }
      }
      // // Remove the old entry
      // delete data[currentSlug];

      // Check if a new slug is provided and ensure it doesn't already exist
      if (slug && data.hasOwnProperty(slug)) {
        return NextResponse.json(
          { error: `Slug '${slug}' already exists` },
          { status: 400 }
        );
      }

      // Create the new entry
      const newSlug = slug || currentSlug; // Use the new slug if provided, otherwise reuse the old one

      // Initialize an empty object for the new data entry

      // Map each property from the input object to the new data entry
      for (const key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key)) {
          data[key] = input[key]; // Map each property to the new entry
          revalidatePath(data[key]);
        }
      }

      // Write the updated data back to the file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      // Revalidate the updated path

      return NextResponse.json(
        { message: `Listing updated successfully` },
        { status: 200 }
      );
      break;
    case "delete":
      if (!id) {
        return NextResponse.json(
          { error: "Missing id parameter" },
          { status: 400 }
        );
      }

      let slugsToDelete: string[];

      if (id.includes("_")) {
        // Delete based on the exact value containing an underscore
        slugsToDelete = Object.keys(data).filter((key) => data[key] === id);
      } else {
        // Delete all entries where the id ends with the provided id
        const regex = new RegExp(`${id}$`);
        slugsToDelete = Object.keys(data).filter((key) =>
          regex.test(data[key])
        );
      }

      if (slugsToDelete.length === 0) {
        return NextResponse.json(
          { error: `Listing with id '${id}' does not exist` },
          { status: 404 }
        );
      }

      slugsToDelete.forEach((slugToDelete) => {
        delete data[slugToDelete];
        revalidatePath(slugToDelete);
      });

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      return NextResponse.json(
        { message: `Listing(s) deleted successfully` },
        { status: 200 }
      );
      break;
    default:
      return NextResponse.json(
        { error: "Invalid action parameter" },
        { status: 400 }
      );
  }
}

export async function GET() {
  return new Response("", {
    status: 405,
  });
}
