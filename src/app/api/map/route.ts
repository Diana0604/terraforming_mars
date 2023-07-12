import { dbConnect } from "@/functions/database/database.server";
import TileModel from "@/functions/database/models/tile.model";
import tileFixtures from "@/fixtures/tiles";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    //connect to db
    await dbConnect();

    //delete tiles and reset to beginning
    await TileModel.deleteMany({});
    await TileModel.create(tileFixtures);

    //respond with success
    return NextResponse.json({
      message: "Database has been reset to show init",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: error });
  }
}
