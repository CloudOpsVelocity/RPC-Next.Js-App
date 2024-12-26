import axios from "axios";
import { NextResponse } from "next/server";
// import { Level } from "level";
// import path from "path";
// var dbPath = process.env.DB_PATH || path.join(__dirname, "mydb");
// var options = {
//   keyEncoding: "binary",
//   valueEncoding: "json",
// };
// var db = new Level(dbPath, options);
// // Open the database
// db.open((err) => {
//   if (err) {
//     console.error("Error opening the LevelDB database:", err);
//   } else {
//     console.log("LevelDB database opened successfully at", dbPath);
//   }
// });
export async function GET(req: Request) {
  try {
    // const data = await axios.get(`https://internal.getrightproperty.com/api/youtube/oauth2/callback?code=4%2F0AeanS0bv-uWP-r3f7BXQwHSr8f1U_NTtisN8HhVTmFzDvOxztLzjKwTxtyfFe6hWhfvUEg&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.upload+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly`)
    return NextResponse.json({ data: "test", status: true });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Error reading file" });
  }
}
