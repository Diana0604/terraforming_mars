import { dbConnect } from "@/functions/database/database.server";
import { NextRequest, NextResponse } from "next/server";
import initialstatsModel from "@/functions/database/models/initialstats/initialstats.model";

export async function GET(_request: NextRequest) {
  //connect to db
  await dbConnect();

  //get list of resources
  let res = await initialstatsModel.findOne();

  if (!res) {
    res = await initialstatsModel.create({ secondsPerRound: 0, darkHourAlertBefore: 0 })
  }

  if (!res.darkHourAlertBefore) res.darkHourAlertBefore = 0;
  res.save();

  //return to frontend
  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  //check request contains appropriate body
  const body = await request.json();

  const darkHourAlertBefore = body.darkHourAlertBefore;
  if (!darkHourAlertBefore) return NextResponse.json({ error: "need time in seconds" }, { status: 300 });

  //check doesn't exist yet
  const initstats = await initialstatsModel.findOne();
  if (!initstats) {
    await initialstatsModel.create({ secondsPerRound: 0, darkHourAlertBefore: darkHourAlertBefore });
    return NextResponse.json({ message: "succesfully added new initialstats" }, { status: 200 });
  }

  //change properties
  initstats.darkHourAlertBefore = darkHourAlertBefore;

  //save
  await initstats.save();

  //success
  return NextResponse.json({ message: "succesfully added new initialstats" }, { status: 200 });
}