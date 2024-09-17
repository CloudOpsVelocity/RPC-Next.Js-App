import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const getFilePath = () =>
  path.join(process.cwd(), "static", "listingSlugs.json");

export async function POST(request: Request) {
  let { slug, id, action, data: slugs } = await request.json();
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
    case "create": {
      if (!slugs) {
        return NextResponse.json(
          { error: "data is required" },
          { status: 400 }
        );
      }
      const errors: string[] = [];
      // Loop through the slugs object to check if it already exists or not
      for (const key in slugs) {
        if (!id || typeof id !== "string") {
          errors.push(`Invalid ID for slug: ${slug}`);
          return;
        }
        if (Object.prototype.hasOwnProperty.call(slugs, key)) {
          const element = slugs[key];
          // Check if the key (slug) already exists in JSON data
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            errors.push(`Slug "${key}" already exists`);
          } else {
            data[key] = element;
            revalidatePath(key);
          }
        }
      }
      // Handle errors if any slugs were invalid or already existed
      if (errors.length > 0) {
        return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
      }
      // Write the updated data back to the file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return NextResponse.json(
        { message: `Listing(s) created successfully`, slugs },
        { status: 201 }
      );
    }
    case "update": {
      if (!id || !slugs || typeof slugs !== "object" || Array.isArray(slugs)) {
        return NextResponse.json(
          { error: "Missing or invalid parameters" },
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
      if (slug && Object.prototype.hasOwnProperty.call(data, slug)) {
        return NextResponse.json(
          { error: `Slug '${slug}' already exists` },
          { status: 400 }
        );
      }

      // Create the new entry

      // Initialize an empty object for the new data entry

      // Map each property from the slugs object to the new data entry
      for (const key in slugs) {
        if (Object.prototype.hasOwnProperty.call(slugs, key)) {
          data[key] = slugs[key]; // Map each property to the new entry
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
    }
    case "delete": {
      if (!id) {
        return NextResponse.json(
          { error: "Missing id parameter" },
          { status: 400 }
        );
      }
      let deleted = false; // Track whether a deletion occurs
      // Loop over keys and delete the ones that contain the id
      Object.keys(data).forEach((key) => {
        if (data[key].includes(id)) {
          delete data[key];
          revalidatePath(key); // Revalidate path after deletion
          if (!deleted) {
            deleted = true;
          }
        }
      });
      // If no deletions occurred, return an error
      if (!deleted) {
        return NextResponse.json(
          { error: `id '${id}' does not exist` },
          { status: 404 }
        );
      }
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return NextResponse.json(
        { message: `Listing slugs deleted successfully` },
        { status: 200 }
      );
    }
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
