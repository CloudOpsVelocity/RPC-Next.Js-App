import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { revalidatePath, revalidateTag } from "next/cache";
import logger from "@/app/utils/logger";

const typeMapping = {
  P: "project",
  B: "builder",
};

const getFilePath = (type: string) =>
  path.join(process.cwd(), "static", `${type}Slugs.json`);

export async function POST(request: Request, response: Response) {
  try {
    let { type, slug, id, action, slugs } = await request.json();
    logger.info(
      `${request.method} request received on ${
        request.url
      }\nRequest data: ${JSON.stringify({ type, slug, id, action, slugs })}`
    );

    // Validate required parameters
    if (!type || !action || (type !== "P" && type !== "B")) {
      logger.error(
        `Invalid type or missing action parameter. Request: ${request.method} ${request.url}`
      );
      return NextResponse.json(
        { error: "Invalid type or missing action parameter" },
        { status: 400 }
      );
    }

    type = typeMapping[type as keyof typeof typeMapping] || type;
    const filePath = getFilePath(type);
    // Ensure the file exists
    if (!fs.existsSync(filePath)) {
      logger.warn(
        `File does not exist, creating a new one: ${filePath}. Request: ${request.method} ${request.url}`
      );
      fs.writeFileSync(filePath, JSON.stringify({}));
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    switch (action) {
      case "create": {
        logger.info(
          `Action: create. Request: ${request.method} ${request.url}`
        );
        if (!slugs || typeof slugs !== "object" || Array.isArray(slugs)) {
          logger.error(
            `Invalid slugs parameter. Request: ${request.method} ${request.url}`
          );
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
            logger.error(
              `Invalid ID for slug: ${slug}. Request: ${request.method} ${request.url}`
            );
            errors.push(`Invalid ID for slug: ${slug}`);
            return;
          }

          // Check if the slug already exists in data
          if (Object.prototype.hasOwnProperty.call(data, slug)) {
            errors.push(`Slug "${slug}" already exists`);
          } else {
            data[slug] = id;
            logger.info(
              `Slug "${slug}" added with ID: ${id}. Request: ${request.method} ${request.url}`
            );
            revalidatePath(slug);
            revalidateTag(slug);
          }
        });

        // Handle errors if any slugs were invalid or already existed
        if (errors.length > 0) {
          logger.error(
            `Errors during slug creation: ${errors}. Request: ${request.method} ${request.url}`
          );
          return NextResponse.json(
            { error: errors.join(", ") },
            { status: 400 }
          );
        }
        // Write updated data to the file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        logger.info(
          `File updated with new slugs. Request: ${request.method} ${request.url}`
        );
        // Success response if all slugs were processed correctly
        logger.info(
          `Slugs created successfully. Request: ${request.method} ${request.url}`
        );
        return NextResponse.json(
          { message: "Slugs created successfully" },
          { status: 201 }
        );
      }
      case "update": {
        logger.info(
          `Action: update. Request: ${request.method} ${request.url}`
        );
        if (
          !id ||
          !slugs ||
          typeof slugs !== "object" ||
          Array.isArray(slugs)
        ) {
          logger.error(
            `Missing or invalid parameters for update. Request: ${request.method} ${request.url}`
          );
          return NextResponse.json(
            { error: "Missing or invalid parameters" },
            { status: 400 }
          );
        }

        // Find and delete existing slugs with the same id
        Object.keys(data).forEach((key) => {
          if (data[key].includes(id)) {
            logger.info(
              `Deleting existing slug "${key}" for ID: ${id}. Request: ${request.method} ${request.url}`
            );
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
            logger.error(
              `Invalid ID for slug: ${slug}. Request: ${request.method} ${request.url}`
            );
            return NextResponse.json(
              { error: `Invalid ID for slug: ${slug}` },
              { status: 400 }
            );
          }
          // Check if the new slug already exists
          if (Object.prototype.hasOwnProperty.call(data, slug)) {
            logger.error(
              `Slug '${slug}' already exists. Request: ${request.method} ${request.url}`
            );
            return NextResponse.json(
              { error: `Slug '${slug}' already exists` },
              { status: 400 }
            );
          }
          // Add the new slug and its corresponding ID
          logger.info(
            `Adding new slug "${slug}" with ID: ${newId}. Request: ${request.method} ${request.url}`
          );
          data[slug] = newId;
        });

        // Write updated data to the file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        logger.info(
          `File updated after slug update: ${JSON.stringify(data)}. Request: ${
            request.method
          } ${request.url}`
        );
        let revalidateTagId: string | null = null;
        // Revalidate all paths for the new slugs
        Object.keys(slugs).forEach((slug) => {
          revalidatePath(slug);
          if (!revalidateTagId) {
            if (type === "project") {
              let id = data[slug].split("_")[2].split("*")[0];
              revalidateTagId = id;
              revalidateTag(id);
            } else if (type === "builder") {
              revalidateTagId = slug;
              revalidateTag(slug);
            }
          }
        });

        return NextResponse.json(
          { message: "Slugs updated successfully" },
          { status: 200 }
        );
      }
      case "delete": {
        logger.info(
          `Action: delete. Request: ${request.method} ${request.url}`
        );
        if (!id) {
          logger.error(
            `Missing id parameter for deletion. Request: ${request.method} ${request.url}`
          );
          return NextResponse.json(
            { error: "Missing id parameter" },
            { status: 400 }
          );
        }

        let deleted = false; // Track whether a deletion occurs
        // Loop over keys and delete the ones that contain the id
        Object.keys(data).forEach((key) => {
          if (type === "project" && data[key].includes(`LT_${id}*`)) {
            logger.info(
              `Deleting slug "${key}" for ID: ${id}. Request: ${request.method} ${request.url}`
            );
            delete data[key];
            if (!deleted) {
              revalidatePath(key.split("/").slice(0, 6).join("/"));
              deleted = true;
            }
          } else if (type === "builder" && id === data[key].split("_")[1]) {
            logger.info(
              `Deleting slug "${key}" for ID: ${id}. Request: ${request.method} ${request.url}`
            );
            delete data[key];
            if (!deleted) {
              revalidatePath(key);
              deleted = true;
            }
          }
        });

        // If no deletions occurred, return an error
        if (!deleted) {
          logger.error(
            `${type} with id '${id}' does not exist. Request: ${request.method} ${request.url}`
          );
          return NextResponse.json(
            { error: `${type} with id '${id}' does not exist` },
            { status: 404 }
          );
        }

        // Write updated data back to the file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        logger.info(
          `${type} with ID "${id}" deleted successfully. Request: ${request.method} ${request.url}`
        );

        return NextResponse.json(
          { message: `${type} deleted successfully` },
          { status: 200 }
        );
      }

      default:
        logger.error(
          `Invalid action parameter. Request: ${request.method} ${request.url}`
        );
        return NextResponse.json(
          { error: "Invalid action parameter" },
          { status: 400 }
        );
    }
  } catch (error) {
    logger.error(
      `Error processing POST request: ${error}. Request: ${request.method} ${request.url}`
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  if (!type || (type !== "P" && type !== "B")) {
    logger.error(
      `Invalid type parameter. Request: ${request.method} ${request.url}`
    );
    return new Response("something went wrong", {
      status: 400,
    });
  }
  const filePath = getFilePath(typeMapping[type]);
  const data = fs.readFileSync(filePath, "utf-8");
  logger.info(
    `GET request successful. Request: ${request.method} ${request.url}`
  );
  return new Response(data, {
    status: 200,
  });
}
