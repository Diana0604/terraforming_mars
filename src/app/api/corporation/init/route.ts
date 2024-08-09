//models
import initialCorporationModel from "@/functions/database/models/initialstats/initialcorps.model";

//database server
import { dbConnect } from "@/functions/database/database.server";

//next
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  //return all corporations
  if (!id && !name) {
    const corporations = await initialCorporationModel
      .find()
      .populate("buildingsOwned")
      .populate("tilesCanBuild")
      .populate("newBuildingsNextRound");

    for (const corporation of corporations) {
      for (const building of corporation.buildingsOwned) {
        await building.populate("tile");
      }

      for (const building of corporation.newBuildingsNextRound) {
        await building.populate("tile");
      }
    }
    // console.log(corporations);
    return NextResponse.json({ corporations: corporations });
  }

  //if only one corporation asked for return single corporation
  let corporation;

  if (id) {
    corporation = await initialCorporationModel
      .findById(id)
      .populate("buildingsOwned");
  } else {
    corporation = await initialCorporationModel
      .findOne({ name: name })
      .populate("buildingsOwned");
  }
  if (!corporation)
    return NextResponse.json(
      { error: "Corporation not found" },
      { status: 500 }
    );

  return NextResponse.json(corporation);
}

export async function POST(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  const name = searchParams.get("name");

}
