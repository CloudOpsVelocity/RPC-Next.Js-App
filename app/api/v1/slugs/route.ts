// import { builderSlugsMap } from "@/static/builderSlugsMap";
// import { projectSlugsMap } from "@/static/projectSlugsMap";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
// export type EntityType = "project" | "builder";
// export function getMap(type: EntityType): Map<string, string | number> {
//   return type === "project" ? projectSlugsMap : builderSlugsMap;
// }
// export async function GET() {
//   return new Response("", {
//     status: 405,
//   });
// }
// export async function POST(request: Request) {
//   const { type, slug, id } = await request.json();

//   if (!type || (type !== "project" && type !== "builder")) {
//     return NextResponse.json(
//       { error: "Invalid type parameter" },
//       { status: 400 }
//     );
//   }

//   const map = getMap(type);
//   if (map.has(slug)) {
//     return NextResponse.json(
//       { error: `${type} already exists` },
//       { status: 400 }
//     );
//   }

//   map.set(slug, id);
//   return NextResponse.json(
//     { message: `${type} created successfully` },
//     { status: 201 }
//   );
// }

// export async function PUT(
//   request: Request,
//   { params }: { params: { slug: string } }
// ) {
//   const { type, id } = await request.json();

//   if (!type || (type !== "project" && type !== "builder")) {
//     return NextResponse.json(
//       { error: "Invalid type parameter" },
//       { status: 400 }
//     );
//   }

//   const map = getMap(type);
//   if (!map.has(params.slug)) {
//     return NextResponse.json({ error: `${type} not found` }, { status: 404 });
//   }

//   map.set(params.slug, id);
//   return NextResponse.json({ message: `${type} updated successfully` });
// }

// export async function DELETE(
//   request: Request,
//   { params }: { params: { slug: string } }
// ) {
//   const { searchParams } = new URL(request.url);
//   const type = searchParams.get("type") as EntityType;

//   if (!type || (type !== "project" && type !== "builder")) {
//     return NextResponse.json(
//       { error: "Invalid type parameter" },
//       { status: 400 }
//     );
//   }

//   const map = getMap(type);
//   if (!map.has(params.slug)) {
//     return NextResponse.json({ error: `${type} not found` }, { status: 404 });
//   }

//   map.delete(params.slug);
//   return NextResponse.json({ message: `${type} deleted successfully` });
// }

export async function GET() {
  return new Response("", {
    status: 405,
  });
}
const getFilePath = (type: string) =>
  path.join(process.cwd(), "static", `${type}Slugs.json`);

export async function POST(request: Request) {
  const { type, slug, id } = await request.json();

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

  return NextResponse.json(
    { message: `${type} created successfully` },
    { status: 201 }
  );
}

export async function PUT(request: Request) {
  const { type, slug, id } = await request.json();

  if (!type || (type !== "project" && type !== "builder")) {
    return NextResponse.json(
      { error: "Invalid type parameter" },
      { status: 400 }
    );
  }

  const filePath = getFilePath(type);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: `${type} not found` }, { status: 404 });
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);

  if (!data.hasOwnProperty(slug)) {
    return NextResponse.json(
      { error: `${type} does not exist` },
      { status: 404 }
    );
  }

  data[slug] = id;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(
    { message: `${type} updated successfully` },
    { status: 200 }
  );
}

export async function DELETE(request: Request) {
  const { type, slug } = await request.json();

  if (!type || (type !== "project" && type !== "builder")) {
    return NextResponse.json(
      { error: "Invalid type parameter" },
      { status: 400 }
    );
  }

  const filePath = getFilePath(type);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: `${type} not found` }, { status: 404 });
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);

  if (!data.hasOwnProperty(slug)) {
    return NextResponse.json(
      { error: `${type} does not exist` },
      { status: 404 }
    );
  }

  delete data[slug];
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(
    { message: `${type} deleted successfully` },
    { status: 200 }
  );
}
