import { dbConnect } from "@/functions/database/database.server";
import { skipToDarkHour } from "@/functions/roundManager";
import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  try {
    await dbConnect();

    skipToDarkHour();

    //return successfully
    return NextResponse.json({message: 'round skipped'});
  } catch (error) {
    console.log('error', error)
    //on error return error message
    return NextResponse.json({
      error: `There was an error: ${error}`,
    });
  }
}
