//models
import initialCorporationModel from "@/functions/database/models/initialstats/initialcorps.model";

//database server
import { dbConnect } from "@/functions/database/database.server";

//next
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();

  //get id, name from search params
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  //return all corporations
  if (!id && !name) {
    const corporations = await initialCorporationModel.find().populate("resourcesOwned");

    return NextResponse.json(corporations);
  }

  //if only one corporation asked for return single corporation
  let corporation;

  if (id) {
    corporation = await initialCorporationModel.findById(id).populate("resourcesOwned");
  } else {
    corporation = await initialCorporationModel.findOne({ name: name }).populate("resourcesOwned");
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
  await initialCorporationModel.deleteMany({ name })

  return NextResponse.json({ message: "success" }, { status: 200 });

}

export async function PUT(request: Request) {
  //connect to db
  await dbConnect();

  //get name from body
  const body = await request.json();

  const { name, resourcesOwned, player, oldName } = body;

  if (!oldName) NextResponse.json({ error: 'need a name to update' });

  //check doesn't exist
  const corp = await initialCorporationModel.findOne({ name: oldName });
  if (!corp) return NextResponse.json({ error: "Corporation not in databse" }, { status: 300 });

  //edit corp
  if (name) corp.name = name;
  if (resourcesOwned) corp.resourcesOwned = resourcesOwned;
  if (player) corp.player = player;

  //save
  await corp.save();

  return NextResponse.json({ message: "success" }, { status: 200 });
}