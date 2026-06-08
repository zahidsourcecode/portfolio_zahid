import { writeFile } from "fs/promises";
import path from "path";

const CV_PIN = "2438";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const pin = formData.get("pin");
    const file = formData.get("file");

    if (pin !== CV_PIN) {
      return Response.json({ error: "Wrong PIN" }, { status: 401 });
    }

    if (!file || typeof file === "string") {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return Response.json({ error: "Only PDF files are allowed" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), "public", "CV.pdf");

    await writeFile(filePath, buffer);

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
