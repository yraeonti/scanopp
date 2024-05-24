import { NextRequest, NextResponse } from "next/server";
import formidable, { errors as formidableErrors } from "formidable";
import mime from "mime";
import { join } from "path";
import * as dateFn from "date-fns";

const form = formidable({
  keepExtensions: true,
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as Blob | null;
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    console.log(file.type);

    console.log(buffer.toString());

    return NextResponse.json({
      cwd: process.cwd(),
      mime: mime.getExtension(file.type),
    });

    //   const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
    //   const uploadDir = join(process.cwd(), "public", relativeUploadDir);
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
