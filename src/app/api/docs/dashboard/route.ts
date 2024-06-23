import { NextRequest, NextResponse } from "next/server";
import clientPromise, { dbName, document_names } from "../../mongodb";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}
