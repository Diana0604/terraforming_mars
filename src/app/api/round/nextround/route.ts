import { elementMissingFromBody } from "@/constants";
import { dbConnect } from "@/functions/database/database.server";
import corporationModel from "@/functions/database/models/corporation.model";
import { Corporation } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  // get body of request
  const body = await request.json();

  // check required params
  if (!body.corporation)
    return NextResponse.json(
      { error: elementMissingFromBody("corporation") },
      { status: 400 }
    );

  // find corporation
  const corporation: Corporation | null = await corporationModel.findOne({ name: body.corporation });

  if (!corporation)
    return NextResponse.json({ error: "corporation name not in database" }, { status: 400 });

  // update corporation to be ready
  corporation.readyForNextRound = true;
  if (corporation.save)
    await corporation.save();

  return NextResponse.json({ message: "success" }, { status: 200 });
}