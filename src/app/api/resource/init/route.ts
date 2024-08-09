import { dbConnect } from "@/functions/database/database.server";
import { NextRequest, NextResponse } from "next/server";
import initialresourcesModel from "@/functions/database/models/initialstats/initialresources.model";

export async function GET(_request: NextRequest) {
  //connect to db
  await dbConnect();

  //get list of resources
  const res = await initialresourcesModel.find();

  //return to frontend
  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {

  //get name
  const { searchParams } = new URL(request.url);

  const name = searchParams.get("name");
  if (!name) return NextResponse.json({ error: "need a name" }, { status: 300 });

  //check doesn't exist yet
  const other = await initialresourcesModel.find({ name });
  if (other.length > 0) return NextResponse.json({ error: "resource already exists" }, { status: 300 });

  //add
  await initialresourcesModel.create({ name });

  //success
  return NextResponse.json({ message: "succesfully created" }, { status: 200 });
}