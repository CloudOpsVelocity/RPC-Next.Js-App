import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const getFilePath = () =>
  path.join(process.cwd(), "static", "listingSlugs.json");

export async function POST(request: Request) {
  let { slug, id, action, slugs } = await request.json();
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
      // Find and delete existing slugs with the same id
      Object.keys(data).forEach((key) => {
        if (data[key].includes(id)) {
          delete data[key];
          revalidatePath(key);
        }
      });
      // Add new slugs to the data
      Object.keys(slugs).forEach((slug) => {
        const newId = slugs[slug];
        if (!newId || typeof newId !== "string") {
          return NextResponse.json(
            { error: `Invalid ID for slug: ${slug}` },
            { status: 400 }
          );
        }
        // Check if the new slug already exists
        if (Object.prototype.hasOwnProperty.call(data, slug)) {
          return NextResponse.json(
            { error: `Slug '${slug}' already exists` },
            { status: 400 }
          );
        }
        // Add the new slug and its corresponding ID
        data[slug] = newId;
      });
      // Write updated data to the file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      // Revalidate all paths for the new slugs
      Object.keys(slugs).forEach((slug) => {
        revalidatePath(slug);
      });
      return NextResponse.json(
        { message: "Slugs updated successfully" },
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
  const filePath =  path.join(process.cwd(), "static", `listingSlugs.json`);
  const data = fs.readFileSync(filePath, "utf-8");
  return NextResponse.json(JSON.parse(data), { status: 200 });
}
