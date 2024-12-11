import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import logger from "@/app/utils/logger";

const getFilePath = () =>
  path.join(process.cwd(), "static", "listingSlugs.json");

export async function POST(request: Request) {
  let body = await request.json();
  const { slug, id, action, slugs } = body;
  logger.info(`POST request received at ${request.url}`, body);
  if (!action) {
    logger.error(`POST ${request.url}: Missing action parameter in request`);
    return NextResponse.json(
      { error: "Missing action parameter" },
      { status: 400 }
    );
  }

  const filePath = getFilePath();

  // Ensure the file exists
  if (!fs.existsSync(filePath)) {
    logger.info(`POST ${request.url}: Creating new listingSlugs.json file`);
    fs.writeFileSync(filePath, JSON.stringify({}));
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);

  switch (action) {
    case "create": {
      if (!slugs) {
        logger.error(
          `POST ${request.url}: Missing slugs data in create action`
        );
        return NextResponse.json(
          { error: "data is required" },
          { status: 400 }
        );
      }
      const errors: string[] = [];
      // Loop through the slugs object to check if it already exists or not
      for (const key in slugs) {
        if (!id || typeof id !== "string") {
          logger.error(`POST ${request.url}: Invalid ID for slug: ${slug}`);
          errors.push(`Invalid ID for slug: ${slug}`);
          return;
        }
        if (Object.prototype.hasOwnProperty.call(slugs, key)) {
          const element = slugs[key];
          // Check if the key (slug) already exists in JSON data
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            logger.warn(`POST ${request.url}: Slug "${key}" already exists`);
            errors.push(`Slug "${key}" already exists`);
          } else {
            data[key] = element;
            revalidatePath(key);
          }
        }
      }
      // Handle errors if any slugs were invalid or already existed
      if (errors.length > 0) {
        logger.error(
          `POST ${request.url}: Multiple errors occurred: ${errors.join(", ")}`
        );
        return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
      }
      // Write the updated data back to the file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      logger.info(`POST ${request.url}: Successfully created new listing(s)`, {
        slugs,
      });
      return NextResponse.json(
        { message: `Listing(s) created successfully`, slugs },
        { status: 201 }
      );
    }
    case "update": {
      if (!id || !slugs || typeof slugs !== "object" || Array.isArray(slugs)) {
        logger.error(
          `POST ${request.url}: Missing or invalid parameters in update action`
        );
        return NextResponse.json(
          { error: "Missing or invalid parameters" },
          { status: 400 }
        );
      }
      // Find and delete existing slugs with the same id
      Object.keys(data).forEach((key) => {
        if (key.split("-").at(-1) === id) {
          delete data[key];
          revalidatePath(key);
          logger.info(`POST ${request.url}: Deleted existing slug: ${key}`);
        }
      });
      // Add new slugs to the data
      Object.keys(slugs).forEach((slug) => {
        const newId = slugs[slug];
        if (!newId || typeof newId !== "string") {
          logger.error(`POST ${request.url}: Invalid ID for slug: ${slug}`);
          return NextResponse.json(
            { error: `Invalid ID for slug: ${slug}` },
            { status: 400 }
          );
        }
        // Check if the new slug already exists
        if (Object.prototype.hasOwnProperty.call(data, slug)) {
          logger.error(`POST ${request.url}: Slug '${slug}' already exists`);
          return NextResponse.json(
            { error: `Slug '${slug}' already exists` },
            { status: 400 }
          );
        }
        // Add the new slug and its corresponding ID
        data[slug] = newId;
        logger.info(`POST ${request.url}: Added new slug: ${slug}`);
      });
      // Write updated data to the file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      // Revalidate all paths for the new slugs
      Object.keys(slugs).forEach((slug) => {
        revalidatePath(slug);
      });
      logger.info(`POST ${request.url}: Successfully updated slugs`);
      return NextResponse.json(
        { message: "Slugs updated successfully" },
        { status: 200 }
      );
    }
    case "delete": {
      if (!id) {
        logger.error(
          `POST ${request.url}: Missing id parameter in delete action`
        );
        return NextResponse.json(
          { error: "Missing id parameter" },
          { status: 400 }
        );
      }
      let deleted = false; // Track whether a deletion occurs
      // Loop over keys and delete the ones that contain the id
      Object.keys(data).forEach((key) => {
        if (key.split("-").at(-1) === id) {
          delete data[key];
          revalidatePath(key); // Revalidate path after deletion
          logger.info(`POST ${request.url}: Deleted slug: ${key}`);
          if (!deleted) {
            deleted = true;
          }
        }
      });
      // If no deletions occurred, return an error
      if (!deleted) {
        logger.error(`POST ${request.url}: id '${id}' does not exist`);
        return NextResponse.json(
          { error: `id '${id}' does not exist` },
          { status: 404 }
        );
      }
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      logger.info(`POST ${request.url}: Successfully deleted listing slugs`);
      return NextResponse.json(
        { message: `Listing slugs deleted successfully` },
        { status: 200 }
      );
    }
    default:
      logger.error(`POST ${request.url}: Invalid action parameter: ${action}`);
      return NextResponse.json(
        { error: "Invalid action parameter" },
        { status: 400 }
      );
  }
}

export async function PUT(request: Request) {
  let body = await request.json();
  const { slugs, ids } = body;
  logger.info(`PUT request received at ${request.url}`, body);

  if (!slugs || typeof slugs !== "object") {
    logger.error(`PUT ${request.url}: Missing or invalid slugs data`);
    return NextResponse.json(
      { error: "Slugs data is required and must be an object" },
      { status: 400 }
    );
  }

  const filePath = getFilePath();

  // Ensure the file exists
  if (!fs.existsSync(filePath)) {
    logger.info(`PUT ${request.url}: Creating new listingSlugs.json file`);
    fs.writeFileSync(filePath, JSON.stringify({}));
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);

  // First delete existing slugs based on ids
  if (ids && Array.isArray(ids)) {
    ids.forEach((id) => {
      Object.keys(data).forEach((key) => {
        if (key.split("-").at(-1) === id) {
          delete data[key];
          logger.info(`PUT ${request.url}: Deleted existing slug: ${key}`);
        }
      });
    });
  }

  Object.assign(data, slugs); // Merge new slugs into existing data

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  logger.info(`PUT ${request.url}: Successfully updated listing slugs`);

  return NextResponse.json(
    { message: "Listing slugs updated successfully" },
    { status: 200 }
  );
}

export async function GET(request: Request) {
  const filePath = getFilePath();
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);
  return NextResponse.json(data, { status: 200 });
}
