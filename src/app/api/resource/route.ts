import corporationModel from "@/functions/database/models/corporation.model";
import { dbConnect } from "@/functions/database/database.server";
import { NextRequest, NextResponse } from "next/server";
import { Resource } from "@/types";
import {
  RESOURCES_LIST,
  elementMissingFromBody,
  invalidParameter,
} from "@/constants";

export async function POST(request: NextRequest) {
  try {
    //connect to db
    await dbConnect();

    //check request contains appropriate body
    const body = await request.json();
    if (!body.resource)
      return NextResponse.json(
        { error: elementMissingFromBody("resource") },
        { status: 400 }
      );
    if (!body.quantity)
      return NextResponse.json(
        { error: elementMissingFromBody("quantity") },
        { status: 400 }
      );
    if (!body.corporation)
      return NextResponse.json(
        { error: elementMissingFromBody("corporation") },
        { status: 400 }
      );

    //obtain params from body
    const quantity = Number(body.quantity);
    const resource = body.resource;
    if (RESOURCES_LIST.indexOf(resource) === -1)
      return NextResponse.json(
        { error: invalidParameter(resource, "resource") },
        { status: 400 }
      );

    //find corporation in database
    const corporation = await corporationModel.findOne({
      name: body.corporation,
    });
    if (!corporation) return NextResponse.json({ message: "error" });

    //update corporation's resources
    const resourceIndex = corporation.resourcesOwned.findIndex(
      (value: Resource) => value.name === resource
    );
    if (resourceIndex === -1) {
      corporation.resourcesOwned.push({ name: resource, quantity: quantity });
      corporation.resourcesNextRound.push({
        name: resource,
        quantity: quantity,
      });
    } else {
      corporation.resourcesOwned[resourceIndex].quantity =
        Number(corporation.resourcesOwned[resourceIndex].quantity) + quantity;

      corporation.resourcesNextRound[resourceIndex].quantity =
        Number(corporation.resourcesOwned[resourceIndex].quantity);
    }

    //save object in database
    await corporation.save();

    //respond with success
    return NextResponse.json({
      message: "Database has been updated",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: error });
  }
}
