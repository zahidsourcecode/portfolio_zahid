import { readFile } from "fs/promises";
import path from "path";

async function readJsonData(filename) {
  const filePath = path.join(process.cwd(), "src", "data", filename);
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

export function jsonDataRoute(filename, errorMessage) {
  return async function GET() {
    try {
      return Response.json(await readJsonData(filename));
    } catch {
      return Response.json({ error: errorMessage }, { status: 500 });
    }
  };
}
