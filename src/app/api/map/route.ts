import { dbConnect } from "@/functions/database/database.server";
import hexagonModel from "@/functions/database/models/hexagon.model";
import mapFixtures from "@/fixtures/tiles";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    //connect to db
    await dbConnect();

    //delete hexagons and reset to beginning
    await hexagonModel.deleteMany({});
    await hexagonModel.create(mapFixtures);

    //respond with success
    return NextResponse.json({
      message: "Database has been reset to show init",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: error });
  }
}
