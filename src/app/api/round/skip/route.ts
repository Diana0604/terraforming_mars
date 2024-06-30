//next objects
import { NextResponse } from "next/server";

//db
import { dbConnect } from "@/functions/database/database.server";

//helpers
import { skipToDarkHour } from "../round.functions";

export async function POST() {
  try {
    await dbConnect();

    skipToDarkHour();

    //return successfully
    return NextResponse.json({ message: 'round skipped' });
  } catch (error) {
    console.log('error', error)
    //on error return error message
    return NextResponse.json({
      error: `There was an error: ${error}`,
    });
  }
}
