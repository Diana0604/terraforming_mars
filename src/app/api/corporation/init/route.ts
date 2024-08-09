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
  //connect to db
  await dbConnect();

  //get name from body
  const body = await request.json();

  const name = body.name;

  //check doesn't exist
  const repeated = await initialCorporationModel.find({ name });
  if (repeated.length > 0) return NextResponse.json({ error: "Corporation arleady exists" }, { status: 300 });

  //add
  await initialCorporationModel.create({ name });

  return NextResponse.json({ message: "success" }, { status: 200 });

}

export async function DELETE(request: Request) {
  //connect to db
  await dbConnect();

  //get name from body
  const body = await request.json();

  const name = body.name;

  //check doesn't exist
  const repeated = await initialCorporationModel.find({ name });
  if (repeated.length === 0) return NextResponse.json({ error: "Corporation does not exist" }, { status: 200 });

  //add
  await initialCorporationModel.deleteMany({name})

  return NextResponse.json({ message: "success" }, { status: 200 });

}