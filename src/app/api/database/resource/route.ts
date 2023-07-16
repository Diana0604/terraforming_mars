import factionModel from "@/functions/database/models/faction.model";
import { dbConnect } from "@/functions/database/database.server";
import { NextRequest, NextResponse } from "next/server";
import { Faction } from "@/types";
import { RESOURCES_LIST } from "@/constants";

export async function POST(request: NextRequest) {
  try {
    //connect to db
    await dbConnect();

    //check request contains appropriate body
    const body = await request.json();
    if (!body.resource) return NextResponse.json({ message: "error" });
    if (!body.quantity) return NextResponse.json({ message: "error" });
    if (!body.faction) return NextResponse.json({ message: "error" });

    //obtain params
    const quantity = Number(body.quantity);
    const resource = body.resource;
    if (RESOURCES_LIST.indexOf(resource) === -1)
      return NextResponse.json({ message: "error" }); //resource name not valid
    const faction: Faction | null = await factionModel.findOne({
      name: body.faction,
    });
    if (!faction) return NextResponse.json({ message: "error" }); //faction doesn't exist

    //update faction
    const resourceIndex = faction.resourcesOwned.findIndex(
      (value) => value.name === resource
    );
    if (resourceIndex === -1) {
      faction.resourcesOwned.push({ name: resource, quantity: quantity });
    } else {
      faction.resourcesOwned[resourceIndex].quantity =
        Number(faction.resourcesOwned[resourceIndex].quantity) + quantity;
    }

    //save object in database
    await factionModel.findOneAndUpdate({ name: body.faction }, faction);

    //respond with success
    return NextResponse.json({
      message: "Database has been updated",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: error });
  }
}
