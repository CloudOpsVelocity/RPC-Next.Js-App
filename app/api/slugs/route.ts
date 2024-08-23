import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

export async function GET() {
  return new Response("", {
    status: 405,
  });
}

const typeMapping = {
  P: "project",
  B: "builder",
};

const getFilePath = (type: string) =>
  path.join(process.cwd(), "static", `${type}Slugs.json`);

export async function POST(request: Request) {
  let { type, slug, id } = await request.json();
  if (!slug || !id) {
    return NextResponse.json(
      { error: "Invalid slug or id parameter" },
      { status: 400 }
    );
  }
  // Convert short form to full type
  type = typeMapping[type as keyof typeof typeMapping] || type;

  if (!type || (type !== "project" && type !== "builder")) {
    return NextResponse.json(
      { error: "Invalid type parameter" },
      { status: 400 }
    );
  }

  const filePath = getFilePath(type);

  // Ensure the file exists
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}));
  }

  // Read the existing data from the file
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);

  // Perform CRUD operations
  if (data.hasOwnProperty(slug)) {
    return NextResponse.json(
      { error: `${type} already exists` },
      { status: 400 }
    );
  }

  // Add new entry
  data[slug] = id;

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  revalidatePath(slug);
  return NextResponse.json(
    { message: `${type} created successfully` },
    { status: 201 }
  );
}

export async function PUT(request: Request) {
  let { type, slug, id } = await request.json();

  // Convert short form to full type
  type = typeMapping[type as keyof typeof typeMapping] || type;

  // Ensure that 'type' and 'id' are provided
  if (!type || !id || (type !== "project" && type !== "builder")) {
    return NextResponse.json(
      { error: "Invalid type or missing id parameter" },
      { status: 400 }
    );
  }

  const filePath = getFilePath(type);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: `${type} not found` }, { status: 404 });
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);

  // Find the current slug by searching for the id
  let currentSlug = Object.keys(data).find((key) => data[key] === id);

  if (!currentSlug) {
    return NextResponse.json(
      { error: `${type} with id '${id}' does not exist` },
      { status: 404 }
    );
  }

  // If the new slug is different and provided, update the slug
  if (slug && slug !== currentSlug) {
    // Ensure the new slug doesn't already exist
    if (data.hasOwnProperty(slug)) {
      return NextResponse.json(
        { error: `Slug '${slug}' already exists` },
        { status: 400 }
      );
    }

    // Update the slug
    data[slug] = id;
    delete data[currentSlug];
  }

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  revalidatePath(slug || currentSlug);

  return NextResponse.json(
    { message: `${type} updated successfully` },
    { status: 200 }
  );
}

export async function DELETE(request: Request) {
  let { type, id } = await request.json();

  // Convert short form to full type
  type = typeMapping[type as keyof typeof typeMapping] || type;

  if (!type || !id || (type !== "project" && type !== "builder")) {
    return NextResponse.json(
      { error: "Invalid type or missing id parameter" },
      { status: 400 }
    );
  }

  const filePath = getFilePath(type);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: `${type} not found` }, { status: 404 });
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);

  // Find the slug by searching for the id
  const slug = Object.keys(data).find((key) => data[key] === id);

  if (!slug) {
    return NextResponse.json(
      { error: `${type} with id '${id}' does not exist` },
      { status: 404 }
    );
  }

  // Delete the entry based on the slug
  delete data[slug];
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  revalidatePath(slug);

  return NextResponse.json(
    { message: `${type} deleted successfully` },
    { status: 200 }
  );
}
