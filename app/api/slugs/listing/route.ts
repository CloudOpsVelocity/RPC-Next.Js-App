import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const getFilePath = () =>
  path.join(process.cwd(), "static", "listingSlugs.json");

export async function POST(request: Request) {
  let { slug, id, action, data: input } = await request.json();
  // samplem input = inoput:{key:value,key:value}
  // Validate required parameters
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
    case "create":
      if (!slug || !id || !input) {
        return NextResponse.json(
          { error: "Invalid slug or id parameter" },
          { status: 400 }
        );
      }
      //  looping this input object check if alraedy exist or not and if not create

      if (data.hasOwnProperty(slug)) {
        return NextResponse.json(
          { error: `Listing already exists` },
          { status: 400 }
        );
      }
      data[slug] = id;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      revalidatePath(slug, "page");
      return NextResponse.json(
        { message: `Listing created successfully` },
        { status: 201 }
      );
      break;
    case "update":
      if (!id) {
        return NextResponse.json(
          { error: "Missing id parameter" },
          { status: 400 }
        );
      }
      const currentSlug = Object.keys(data).find((key) => data[key] === id);
      if (!currentSlug) {
        return NextResponse.json(
          { error: `Listing with id '${id}' does not exist` },
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
        data[slug] = id;
        delete data[currentSlug];
      }
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      revalidatePath(slug || currentSlug);
      return NextResponse.json(
        { message: `Listing updated successfully` },
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

      let slugsToDelete: string[];

      if (id.includes("_")) {
        // Delete based on the exact value containing an underscore
        slugsToDelete = Object.keys(data).filter((key) => data[key] === id);
      } else {
        // Delete all entries where the id ends with the provided id
        const regex = new RegExp(`${id}$`);
        slugsToDelete = Object.keys(data).filter((key) =>
          regex.test(data[key])
        );
      }

      if (slugsToDelete.length === 0) {
        return NextResponse.json(
          { error: `Listing with id '${id}' does not exist` },
          { status: 404 }
        );
      }

      slugsToDelete.forEach((slugToDelete) => {
        delete data[slugToDelete];
        revalidatePath(slugToDelete);
      });

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      return NextResponse.json(
        { message: `Listing(s) deleted successfully` },
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
