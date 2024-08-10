//models
import initialbuildingModel from "@/functions/database/models/initialstats/initialbuilding.model";

//database server
import { dbConnect } from "@/functions/database/database.server";

//next
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();

  //get id, name from search params
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const buildingType = searchParams.get("buildingType");

  //return all corporations
  if (!id && !buildingType) {

    const buildings = await initialbuildingModel.find().populate("buildingCost").populate("dailyCost").populate("dailyProduction");

    return NextResponse.json(buildings);
  }

  //if only one corporation asked for return single corporation
  let building;

  if (id) {
    building = await initialbuildingModel.findById(id).populate("resourcesOwned");
  } else {
    building = await initialbuildingModel.findOne({ buildingType: buildingType }).populate("resourcesOwned");
  }
  if (!building)
    return NextResponse.json(
      { error: "Corporation not found" },
      { status: 500 }
    );

  return NextResponse.json(building);
}

export async function POST(request: Request) {
  //connect to db
  await dbConnect();

  //get name from body
  const body = await request.json();

  const buildingType = body.buildingType;

  //check doesn't exist
  const repeated = await initialbuildingModel.find({ buildingType });
  if (repeated.length > 0) return NextResponse.json({ error: "Corporation arleady exists" }, { status: 300 });

  //add
  await initialbuildingModel.create({ buildingType });

  return NextResponse.json({ message: "success" }, { status: 200 });

}

export async function DELETE(request: Request) {
  //connect to db
  await dbConnect();

  //get name from body
  const body = await request.json();

  const buildingType = body.buildingType;

  //check doesn't exist
  const repeated = await initialbuildingModel.find({ buildingType });
  if (repeated.length === 0) return NextResponse.json({ error: "Corporation does not exist" }, { status: 200 });

  //add
  await initialbuildingModel.deleteMany({ buildingType })

  return NextResponse.json({ message: "success" }, { status: 200 });

}

export async function PUT(request: Request) {
  //connect to db
  await dbConnect();

  //get name from body
  const body = await request.json();

  const { oldType, buildingType, dailyCost, dailyProduction, buildingCost } = body;

  if (!oldType) NextResponse.json({ error: 'need a type to update' });

  //check exists
  const building = await initialbuildingModel.findOne({ buildingType: oldType });
  if (!building) return NextResponse.json({ error: "Corporation not in databse" }, { status: 300 });

  //edit building
  if (buildingType) building.buildingType = buildingType;
  if (dailyCost) building.dailyCost = dailyCost;
  if (dailyProduction) building.dailyProduction = dailyProduction;
  if (buildingCost) building.buildingCost = buildingCost;

  //save
  await building.save();

  return NextResponse.json({ message: "success" }, { status: 200 });
}