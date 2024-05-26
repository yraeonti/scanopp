import { NextRequest, NextResponse } from "next/server";
import formidable, { errors as formidableErrors } from "formidable";
import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";
import mime from "mime";
import { PDFDocument } from "pdf-lib";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    let result;

    const formData = await req.formData();

    const file = formData.get("file") as Blob | null;
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const mimeType = mime.getExtension(file.type);

    switch (mimeType) {
      case "pdf":
        result = await parsePDFDocument(buffer);
        break;

      case "jpg":
      case "jpeg":
      case "png":
      case "webp":
        result = await parseImage(buffer, mimeType);
        result = result ? JSON.parse(result) : null;
        break;

      default:
        break;
    }

    console.log(file.type);

    return NextResponse.json({
      status: true,
      data: result,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}

async function parsePDFDocument(buf: Buffer) {
  return [
    {
      message: "No pdf implementation yet",
    },
  ];
  //   const fields = form.getFields();

  //   console.log("pdf doc bruv", form);
}

async function parseImage(buf: Buffer, ext: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `
        You will be provided with an image that should correspond to a receipt. 
        You will go through the receipt and return a consistent array of objects, with the keys
        as these: transaction, amount, status, date, benefactor and category.

        - transaction: What the item being bought is for
        - amount: Amount of the sold item
        - status: If the transaction was succesful or not (only two possible values: true or false)
        - date: Date of purchase
        - benefactor: The recipient of the purchase, the seller
        - category: If it was a credit transaction or debit transaction (only two possible values: debit or credit)

        If the image does not correspond to a receipt return an empty array. 
        For any values that can't be determined return javascript null.
        Return only the json format with no writeups for all instances.
        `,
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: `data:image/${ext};base64,${buf.toString("base64")}`,
            },
          },
        ],
      },
    ],
  });

  return response.choices[0].message.content;
}
