import { dbConnect } from "@/functions/database/database.server";
import { NextRequest, NextResponse } from "next/server";
import { Resource } from "@/types";
import initialstatsModel from "@/functions/database/models/initialstats/initialstats.model";

export async function GET(_request: NextRequest) {
  //connect to db
  await dbConnect();

  //get list of resources
  const res = await initialstatsModel.find();

  //return to frontend
  return NextResponse.json(res);
}

export async function PUT(request: NextRequest) {
  //check request contains appropriate body
  const body = await request.json();

  const secondsPerRound = body.secondsPerRound;
  if (!secondsPerRound) return NextResponse.json({ error: "need time in seconds" }, { status: 300 });

  //check doesn't exist yet
  const other = await initialstatsModel.findOne();

  //change properties
  other.secondsPerRound = secondsPerRound;

  //save
  await other.save();

  //success
  return NextResponse.json({ message: "succesfully added new initialstats" }, { status: 200 });
}