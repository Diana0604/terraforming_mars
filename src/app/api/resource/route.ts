import corporationModel from "@/functions/database/models/corporation.model";
import { dbConnect } from "@/functions/database/database.server";
import { NextRequest, NextResponse } from "next/server";
import { Corporation } from "@/types";
import {
  RESOURCES_LIST,
  elementMissingFromBody,
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
    if (!body.quantity) {
      console.log('couldnt find quantity')
      return NextResponse.json(
        { error: elementMissingFromBody("quantity") },
        { status: 400 }
      );
    }
    if (!body.corporation)
      return NextResponse.json(
        { error: elementMissingFromBody("corporation") },
        { status: 400 }
      );

    if (!body.id)
      return NextResponse.json(
        { error: elementMissingFromBody("id") },
        { status: 400 }
      );

    //check id is correct
    const id = Number(body.id);

    if (!RESOURCES_LIST[id]) {
      console.log('nothing in resources list')
      return NextResponse.json({ error: "id out of bounds" }, { status: 400 });
    }

    if (!RESOURCES_LIST[id].name.includes(body.resource)) {
      console.log('name didnt match')
      return NextResponse.json({ error: "Wrong name" }, { status: 400 });
    }

    //obtain params from body
    const quantity = Number(body.quantity);

    //find corporation in database
    const corporation: Corporation = await corporationModel.findOne({
      name: body.corporation,
    }) as Corporation;
    if (!corporation) return NextResponse.json({ message: "error" });

    //update corporation's resources
    const currentlyOwned = Number(corporation.resourcesOwned[id].quantity);

    corporation.resourcesOwned[id].quantity = currentlyOwned + quantity;

    //update next round
    if (corporation.resourcesNextRound) {
      const nextRound = Number(corporation.resourcesNextRound[id].quantity);
      corporation.resourcesNextRound[id].quantity = nextRound + quantity;
    }

    //save object in database
    if (corporation.save)
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
