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
  let { type, slug, id, action, newId } = await request.json();
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
    case "create":
      if (!slug || !id) {
        return NextResponse.json(
          { error: "Invalid slug or id parameter" },
          { status: 400 }
        );
      }
      if (data.hasOwnProperty(slug)) {
        return NextResponse.json(
          { error: `${type} already exists` },
          { status: 400 }
        );
      }
      data[slug] = id;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(slug, "from create");
      revalidatePath(slug);
      // revalidatePath(slug, "layout");
      revalidateTag(slug);
      return NextResponse.json(
        { message: `${type} created successfully` },
        { status: 201 }
      );
      break;
    case "update":
      if (!id || !newId) {
        return NextResponse.json(
          { error: "Missing id parameter" },
          { status: 400 }
        );
      }
      const currentSlug = Object.keys(data).find((key) => data[key] === id);
      if (!currentSlug) {
        return NextResponse.json(
          { error: `${type} with id '${id}' does not exist` },
          { status: 404 }
        );
      }
      if (slug && slug !== currentSlug) {
        if (data.hasOwnProperty(slug)) {
          return NextResponse.json(
            { error: `Slug '${slug}' already exists` },
            { status: 400 }
          );
        }
        data[slug] = newId;
        delete data[currentSlug];
      }
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      revalidatePath(slug || currentSlug);
      // revalidateTag(slug || currentSlug);
      return NextResponse.json(
        { message: `${type} updated successfully` },
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
      const slugToDelete = Object.keys(data).find((key) => data[key] === id);
      if (!slugToDelete) {
        return NextResponse.json(
          { error: `${type} with id '${id}' does not exist` },
          { status: 404 }
        );
      }
      delete data[slugToDelete];
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      revalidatePath(slugToDelete);
      return NextResponse.json(
        { message: `${type} deleted successfully` },
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
