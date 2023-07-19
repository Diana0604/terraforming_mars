import corporationModel from "@/functions/database/models/corporation.model";
import { dbConnect } from "@/functions/database/database.server";
import { NextRequest, NextResponse } from "next/server";
import { Corporation } from "@/types";
import { RESOURCES_LIST } from "@/constants";

export async function POST(request: NextRequest) {
  try {
    //connect to db
    await dbConnect();

    //check request contains appropriate body
    const body = await request.json();
    if (!body.resource) return NextResponse.json({ message: "error" });
    if (!body.quantity) return NextResponse.json({ message: "error" });
    if (!body.corporation) return NextResponse.json({ message: "error" });

    //obtain params
    const quantity = Number(body.quantity);
    const resource = body.resource;
    if (RESOURCES_LIST.indexOf(resource) === -1)
      return NextResponse.json({ message: "error" }); //resource name not valid
    const corporation: Corporation | null = await corporationModel.findOne({
      name: body.corporation,
    });
    if (!corporation) return NextResponse.json({ message: "error" }); //corporation doesn't exist

    //update corporation
    const resourceIndex = corporation.resourcesOwned.findIndex(
      (value) => value.name === resource
    );
    if (resourceIndex === -1) {
      corporation.resourcesOwned.push({ name: resource, quantity: quantity });
    } else {
      corporation.resourcesOwned[resourceIndex].quantity =
        Number(corporation.resourcesOwned[resourceIndex].quantity) + quantity;
    }

    //save object in database
    await corporationModel.findOneAndUpdate({ name: body.corporation }, corporation);

    //respond with success
    return NextResponse.json({
      message: "Database has been updated",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: error });
  }
}
