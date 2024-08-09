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
  //check request contains appropriate body
  const body = await request.json();

  const name = body.name;
  if (!name) return NextResponse.json({ error: "need a name" }, { status: 300 });

  //check doesn't exist yet
  const other = await initialresourcesModel.find({ name });
  if (other.length > 0) return NextResponse.json({ error: "resource already exists" }, { status: 300 });

  //add
  await initialresourcesModel.create({ name });

  //success
  return NextResponse.json({ message: "succesfully created" }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  //check request contains appropriate body
  const body = await request.json();

  const name = body.name;
  if (!name) return NextResponse.json({ error: "need a name" }, { status: 300 });

  //check doesn't exist yet
  const other = await initialresourcesModel.find({ name });
  if (other.length === 0) return NextResponse.json({ message: "resource not in db" }, { status: 200 });

  //delete
  await initialresourcesModel.deleteMany({ name });

  //success
  return NextResponse.json({ message: "succesfully created" }, { status: 200 });
}