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
  try {
    console.log("POST request received");

    let { type, slug, id, action, slugs } = await request.json();
    console.log("Request data:", { type, slug, id, action, slugs });

    // Validate required parameters
    if (!type || !action || (type !== "P" && type !== "B")) {
      console.error("Invalid type or missing action parameter");
      return NextResponse.json(
        { error: "Invalid type or missing action parameter" },
        { status: 400 }
      );
    }

    type = typeMapping[type as keyof typeof typeMapping] || type;
    const filePath = getFilePath(type);
    console.log("File path resolved:", filePath);

    // Ensure the file exists
    if (!fs.existsSync(filePath)) {
      console.warn("File does not exist, creating a new one:", filePath);
      fs.writeFileSync(filePath, JSON.stringify({}));
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    console.log("Current file content:", data);

    switch (action) {
      case "create": {
        console.log("Action: create");
        if (!slugs || typeof slugs !== "object" || Array.isArray(slugs)) {
          console.error("Invalid slugs parameter");
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
            console.error(`Invalid ID for slug: ${slug}`);
            errors.push(`Invalid ID for slug: ${slug}`);
            return;
          }

          // Check if the slug already exists in data
          if (Object.prototype.hasOwnProperty.call(data, slug)) {
            console.error(`Slug "${slug}" already exists`);
            errors.push(`Slug "${slug}" already exists`);
          } else {
            data[slug] = id;
            console.log(`Slug "${slug}" added with ID: ${id}`);
            revalidatePath(slug);
            revalidateTag(slug);
          }
        });

        // Write updated data to the file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log("File updated with new slugs:", data);

        // Handle errors if any slugs were invalid or already existed
        if (errors.length > 0) {
          console.error("Errors during slug creation:", errors);
          return NextResponse.json(
            { error: errors.join(", ") },
            { status: 400 }
          );
        }

        // Success response if all slugs were processed correctly
        console.log("Slugs created successfully");
        return NextResponse.json(
          { message: "Slugs created successfully" },
          { status: 201 }
        );
      }
      case "update": {
        console.log("Action: update");
        if (
          !id ||
          !slugs ||
          typeof slugs !== "object" ||
          Array.isArray(slugs)
        ) {
          console.error("Missing or invalid parameters for update");
          return NextResponse.json(
            { error: "Missing or invalid parameters" },
            { status: 400 }
          );
        }

        // Find and delete existing slugs with the same id
        Object.keys(data).forEach((key) => {
          if (data[key].includes(id)) {
            console.log(`Deleting existing slug "${key}" for ID: ${id}`);
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
            console.error(`Invalid ID for slug: ${slug}`);
            return NextResponse.json(
              { error: `Invalid ID for slug: ${slug}` },
              { status: 400 }
            );
          }
          // Check if the new slug already exists
          if (Object.prototype.hasOwnProperty.call(data, slug)) {
            console.error(`Slug '${slug}' already exists`);
            return NextResponse.json(
              { error: `Slug '${slug}' already exists` },
              { status: 400 }
            );
          }
          // Add the new slug and its corresponding ID
          console.log(`Adding new slug "${slug}" with ID: ${newId}`);
          data[slug] = newId;
        });

        // Write updated data to the file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log("File updated after slug update:", data);

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
        console.log("Action: delete");
        if (!id) {
          console.error("Missing id parameter for deletion");
          return NextResponse.json(
            { error: "Missing id parameter" },
            { status: 400 }
          );
        }

        let deleted = false; // Track whether a deletion occurs
        // Loop over keys and delete the ones that contain the id
        Object.keys(data).forEach((key) => {
          if (data[key].includes(id)) {
            console.log(`Deleting slug "${key}" for ID: ${id}`);
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
          console.error(`${type} with id '${id}' does not exist`);
          return NextResponse.json(
            { error: `${type} with id '${id}' does not exist` },
            { status: 404 }
          );
        }

        // Write updated data back to the file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`${type} with ID "${id}" deleted successfully`);

        return NextResponse.json(
          { message: `${type} deleted successfully` },
          { status: 200 }
        );
      }

      default:
        console.error("Invalid action parameter");
        return NextResponse.json(
          { error: "Invalid action parameter" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  console.log("GET request received, method not allowed");
  return new Response("", {
    status: 405,
  });
}
