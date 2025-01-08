import axios from "axios";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// const Datastore = require("nedb");
// const path = require("path");

// Function to initialize the database
// const createDb = (dbName) => {
//   const dbPath = path.join(__dirname, "../static", dbName);
//   const db = new Datastore({ filename: dbPath, autoload: true });

//   return db;
// };
export async function GET(req: Request, res: NextResponse) {
  try {
    const p = path.join(process.cwd(), "logs");
    const fileName = path.join(p, "nextjs-app-logs-8-01-2025.log.txt");
    const logs = fs.readFileSync(fileName, "utf-8");
    // lib/dbConfig.js
    // const db = createDb("slugs.db"); // Initialize the database

    // // Insert the key-value pair
    // db.insert({ key: slug, value: id }, function (err, newDoc) {
    //   if (err) {
    //     return NextResponse.json({ message: "Error inserting data" });
    //   }
    //   return NextResponse.json({ message: "Data inserted", data: newDoc });
    // });

    // Expose the function to initialize different databases

    // const data = await axios.get(`https://internal.getrightproperty.com/api/youtube/oauth2/callback?code=4%2F0AeanS0bv-uWP-r3f7BXQwHSr8f1U_NTtisN8HhVTmFzDvOxztLzjKwTxtyfFe6hWhfvUEg&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.upload+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly`)
    return NextResponse.json({ data: "test", status: true, logs });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Error reading file" });
  }
}
