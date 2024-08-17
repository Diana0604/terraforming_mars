//next objects
import { NextRequest, NextResponse } from "next/server";

//types
import { Corporation } from "@/types";

//database
import { dbConnect } from "@/functions/database/database.server";
import corporationModel from "@/functions/database/models/corporation.model";

//helpers
import {
  elementMissingFromBody,
} from "@/constants";
import RESOURCES_LIST from "@/fixtures/resources.fixtures";


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

    //obtain params from body
    const quantity = Number(body.quantity);

    //find corporation in database
    const corporation: Corporation = await corporationModel.findOne({
      name: body.corporation,
    }) as Corporation;
    if (!corporation) return NextResponse.json({ message: "error" });

    //find index
    console.log('finding index of ', body.resource, ' in ', corporation.resourcesOwned);
    const index = corporation.resourcesOwned.map(value => value.name).indexOf(body.resource);

    //update corporation's resources
    const currentlyOwned = Number(corporation.resourcesOwned[index].quantity);

    console.log('updating resources onwed')

    corporation.resourcesOwned[index].quantity = currentlyOwned + quantity;

    console.log('updating next round', corporation.resourcesNextRound);

    //update next round
    if (corporation.resourcesNextRound) {
      const nextRound = Number(corporation.resourcesNextRound[index].quantity);
      corporation.resourcesNextRound[index].quantity = nextRound + quantity;
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
