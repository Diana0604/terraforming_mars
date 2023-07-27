//next objects
import { NextRequest, NextResponse } from "next/server";

//database
import { dbConnect } from "@/functions/database/database.server";
import corporationModel from "@/functions/database/models/corporation.model";
import tileModel from "@/functions/database/models/tile.model";

//constants
import {
  PRESET_BUILDINGS_LIST,
  elementNotFoundInDatabase,
  elementMissingFromBody,
  CANNOT_BUILD_ERROR_MESSAGE,
  TILE_ALREADY_COLONIZED,
  DATABASE_SUCCESSFULLY_UPDATED,
} from "@/constants";

//function helpers
import { canBuild } from "@/functions/helpers";
import buildingModel from "@/functions/database/models/building.model";

export async function POST(request: NextRequest) {
  try {
    //connect to db
    await dbConnect();

    //check request contains appropriate body
    const body = await request.json();
    if (!body.corporation)
      return NextResponse.json(
        { error: elementMissingFromBody("corporation") },
        { status: 400 }
      );
    if (!body.buildingType)
      return NextResponse.json(
        { error: elementMissingFromBody("buildingType") },
        { status: 400 }
      );
    if (!body.tile)
      return NextResponse.json(
        { error: elementMissingFromBody("tile") },
        { status: 400 }
      );

    //find corporation in database
    const corporation = await corporationModel.findOne({
      name: body.corporation,
    });
    if (!corporation)
      return NextResponse.json(
        { error: elementNotFoundInDatabase("corporation") },
        { status: 500 }
      );

    //find tile in database
    const tileParams = {
      column: body.tile[0],
      row: Number(body.tile[1]),
    };
    const tile = await tileModel.findOne(tileParams);
    if (!tile)
      return NextResponse.json(
        { message: elementNotFoundInDatabase("tile") },
        { status: 500 }
      );

    //obtain building
    const building = PRESET_BUILDINGS_LIST.filter((value) => {
      return value.buildingType === body.buildingType;
    })[0];

    //check enough resources
    if (!canBuild(corporation.resourcesOwned, building))
      return NextResponse.json(
        { error: CANNOT_BUILD_ERROR_MESSAGE },
        { status: 400 }
      );

    //check tile available
    if (tile.colonizedBy && tile.colonizedBy != corporation._id)
      return NextResponse.json(
        { message: TILE_ALREADY_COLONIZED },
        { status: 400 }
      );

    //create building
    const buildingObject = await buildingModel.create({
      ...building,
      owner: corporation._id,
      tile: tile._id,
    });

    //update corporation resources
    for (const resourceNeeded of building.buildingCost) {
      for (const index in corporation.resourcesOwned) {
        const corpResource = corporation.resourcesOwned[index];
        if (resourceNeeded.name === corpResource.name) {
          corpResource.quantity =
            Number(corpResource.quantity) - resourceNeeded.quantity;
          continue;
        }
      }
    }

    //add building to corporation list
    corporation.buildingsOwned.push(buildingObject._id);

    //save corporation object
    await corporation.save();

    //update colonization status for tile if necessary
    if (!tile.colonizedBy) {
      tile.colonizedBy = corporation._id;
    }
    tile.buildings.push(buildingObject._id);

    await tile.save();

    //respond with success
    return NextResponse.json({
      message: DATABASE_SUCCESSFULLY_UPDATED,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: error });
  }
}
