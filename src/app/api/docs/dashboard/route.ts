import { NextRequest, NextResponse } from "next/server";
import clientPromise, { dbName, document_names } from "../../mongodb";
import { Scanned_docs } from "../../model.dto";
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

  const pipeline_debit = [
    {
      $match: {
        category: "debit",
        user_id: userId,
      },
    },
    {
      $group: {
        _id: null,
        sum_total: { $sum: "$amount" },
      },
    },
  ];

  const pipeline_credit = [
    {
      $match: {
        category: "credit",
        user_id: userId,
      },
    },
    {
      $group: {
        _id: null,
        sum_total: { $sum: "$amount" },
      },
    },
  ];

  const pipeline_successful = [
    {
      $match: {
        status: true,
        user_id: userId,
      },
    },
    {
      $group: {
        _id: null,
        sum_total: { $sum: "$amount" },
      },
    },
  ];

  const pipeline_failed = [
    {
      $match: {
        status: false,
        user_id: userId,
      },
    },
    {
      $group: {
        _id: null,
        sum_total: { $sum: "$amount" },
      },
    },
  ];

  try {
    const total_debit = await db
      .collection(document_names.scanned_docs)
      .aggregate(pipeline_debit)
      .toArray();
    const total_credit = await db
      .collection(document_names.scanned_docs)
      .aggregate(pipeline_credit)
      .toArray();
    const total_successful = await db
      .collection(document_names.scanned_docs)
      .aggregate(pipeline_successful)
      .toArray();
    const total_failed = await db
      .collection(document_names.scanned_docs)
      .aggregate(pipeline_failed)
      .toArray();

    const recent_transactions = await db
      .collection(document_names.scanned_docs)
      .find({ user_id: userId })
      .toArray();

    return NextResponse.json({
      total_debit,
      total_credit,
      total_successful,
      total_failed,
      recent_transactions,
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
