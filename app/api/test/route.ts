import fs from "fs";
export async function GET(req: Request) {
  try {
    const file = await new Promise((resolve, reject) => {
      fs.readFile(
        "c:/Users/Cyntexia/Documents/GitHub/rpc-2.0/README.md",
        "utf8",
        (err, data) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        }
      );
    });

    return Response.json({ ok: true, data: file });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Error reading file" });
  }
}
