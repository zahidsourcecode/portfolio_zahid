import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "schooling.json");
    const raw = await readFile(filePath, "utf8");
    const data = JSON.parse(raw);

    return Response.json(data);
  } catch {
    return Response.json({ error: "Failed to load schooling data" }, { status: 500 });
  }
}
