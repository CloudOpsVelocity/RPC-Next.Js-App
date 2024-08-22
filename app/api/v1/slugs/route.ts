import { builderSlugsMap } from "@/static/builderSlugsMap";
import { projectSlugsMap } from "@/static/projectSlugsMap";
import { NextResponse } from "next/server";
export type EntityType = "project" | "builder";
export function getMap(type: EntityType): Map<string, string | number> {
  return type === "project" ? projectSlugsMap : builderSlugsMap;
}
export async function GET() {
  return new Response("", {
    status: 405,
  });
}
export async function POST(request: Request) {
  const { type, slug, id } = await request.json();

  if (!type || (type !== "project" && type !== "builder")) {
    return NextResponse.json(
      { error: "Invalid type parameter" },
      { status: 400 }
    );
  }

  const map = getMap(type);
  if (map.has(slug)) {
    return NextResponse.json(
      { error: `${type} already exists` },
      { status: 400 }
    );
  }

  map.set(slug, id);
  return NextResponse.json(
    { message: `${type} created successfully` },
    { status: 201 }
  );
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { type, id } = await request.json();

  if (!type || (type !== "project" && type !== "builder")) {
    return NextResponse.json(
      { error: "Invalid type parameter" },
      { status: 400 }
    );
  }

  const map = getMap(type);
  if (!map.has(params.slug)) {
    return NextResponse.json({ error: `${type} not found` }, { status: 404 });
  }

  map.set(params.slug, id);
  return NextResponse.json({ message: `${type} updated successfully` });
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as EntityType;

  if (!type || (type !== "project" && type !== "builder")) {
    return NextResponse.json(
      { error: "Invalid type parameter" },
      { status: 400 }
    );
  }

  const map = getMap(type);
  if (!map.has(params.slug)) {
    return NextResponse.json({ error: `${type} not found` }, { status: 404 });
  }

  map.delete(params.slug);
  return NextResponse.json({ message: `${type} deleted successfully` });
}
