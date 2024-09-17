import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { revalidatePath, revalidateTag } from "next/cache";

const typeMapping = {
  P: "project",
  B: "builder",
};

const getFilePath = (type: string) =>
  path.join(process.cwd(), "static", `${type}Slugs.json`);

export async function POST(request: Request, response: Response) {
  let { type, slug, id, action, slugs } = await request.json();
  // Validate required parameters
  if (!type || !action || (type !== "P" && type !== "B")) {
    return NextResponse.json(
      { error: "Invalid type or missing action parameter" },
      { status: 400 }
    );
  }

  type = typeMapping[type as keyof typeof typeMapping] || type;
  const filePath = getFilePath(type);

  // Ensure the file exists
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}));
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);

  switch (action) {
    case "create": {
      if (!slugs || typeof slugs !== "object" || Array.isArray(slugs)) {
        return NextResponse.json(
          { error: "Invalid slugs parameter. Expected an object." },
          { status: 400 }
        );
      }
      const errors: string[] = [];

      // Iterate over each key-value pair in the slugs object
      Object.keys(slugs).forEach((slug) => {
        const id = slugs[slug];

        if (!id || typeof id !== "string") {
          errors.push(`Invalid ID for slug: ${slug}`);
          return;
        }

        // Check if the slug already exists in data
        if (Object.prototype.hasOwnProperty.call(data, slug)) {
          errors.push(`Slug "${slug}" already exists`);
        } else {
          data[slug] = id;
          revalidatePath(slug);
          revalidateTag(slug);
        }
      });

      // Write updated data to the file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      // Handle errors if any slugs were invalid or already existed
      if (errors.length > 0) {
        return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
      }

      // Success response if all slugs were processed correctly
      return NextResponse.json(
        { message: "Slugs created successfully" },
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
          if (type === "P") {
            revalidatePath(key.split("/").slice(0, 6).join("/"));
          }
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
          if (type === "P") {
            revalidatePath(key.split("/").slice(0, 6).join("/"));
          }
          revalidatePath(key); // Revalidate path after deletion
          deleted = true; // Mark as deleted
        }
      });
      // If no deletions occurred, return an error
      if (!deleted) {
        return NextResponse.json(
          { error: `${type} with id '${id}' does not exist` },
          { status: 404 }
        );
      }

      // Write updated data back to the file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      return NextResponse.json(
        { message: `${type} deleted successfully` },
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
