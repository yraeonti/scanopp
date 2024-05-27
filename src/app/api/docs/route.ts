import { NextRequest, NextResponse } from "next/server";
import clientPromise, { dbName, document_names } from "../mongodb";
import { Scanned_docs } from "../model.dto";
import { auth } from "@clerk/nextjs/server";
import { SortDirection } from "mongodb";

export async function GET(req: NextRequest, res: NextResponse) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Error: No signed in user" },
      { status: 401 }
    );
  }

  const client = await clientPromise;
  const db = client.db(dbName);

  try {
    const options = {
      sort: { created_at: -1 as SortDirection },
    };

    const docs = await db
      .collection<Scanned_docs>(document_names.scanned_docs)
      .find({ user_id: userId }, options)
      .toArray();

    return NextResponse.json({
      status: true,
      data: docs,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}
