//next objects
import { NextRequest, NextResponse } from "next/server";

//database
import { dbConnect } from "@/functions/database/database.server";
import corporationModel from "@/functions/database/models/corporation.model";
import tileModel from "@/functions/database/models/tile.model";

//constants
import {
  elementNotFoundInDatabase,
  elementMissingFromBody,
  CANNOT_BUILD_ERROR_MESSAGE,
  DATABASE_SUCCESSFULLY_UPDATED,
} from "@/constants";

//function helpers
import { build, canBuild, isValidBuilding, setTileAsColonized } from "./build.functions";
import buildingModel from "@/functions/database/models/building.model";
import getBuildingList from "@/fixtures/buildings.fixtures";

export async function POST(request: NextRequest) {
  try {
    //connect to db
    await dbConnect();

    //check request contains appropriate body
    const requestBody = await request.json();

    const corporationName = requestBody.corporation;
    const buildingIndex = requestBody.buildingIndex;
    const tileRowCol = requestBody.tile;

    if (!corporationName)
      return NextResponse.json(
        { error: elementMissingFromBody("corporation") },
        { status: 400 }
      );
    if (Number.isNaN(buildingIndex))
      return NextResponse.json(
        { error: elementMissingFromBody("buildingIndex") },
        { status: 400 }
      );
    if (!tileRowCol)
      return NextResponse.json(
        { error: elementMissingFromBody("tile") },
        { status: 400 }
      );

    //find corporation in database
    const corporation = await corporationModel.findOne({
      name: corporationName
    });
    if (!corporation)
      return NextResponse.json(
        { error: elementNotFoundInDatabase("corporation") },
        { status: 500 }
      );

    //find building in list
    const PRESET_BUILDINGS_LIST = getBuildingList();
    const building = PRESET_BUILDINGS_LIST[buildingIndex];
    if (!building)
      return NextResponse.json(
        { error: "building is not valid" },
        { status: 400 })


    //find tile in database
    const tileParams = {
      column: tileRowCol[0],
      row: Number(tileRowCol[1]),
    };
    const tile = await tileModel.findOne(tileParams).populate("buildings");
    if (!tile)
      return NextResponse.json(
        { message: elementNotFoundInDatabase("tile") },
        { status: 500 }
      );
    
    const buildingType = building.buildingType;

    //check building validiity
    const validBuilding = await isValidBuilding(tile, buildingType, corporation);
    //check building is valid
    if (!validBuilding)
      return NextResponse.json(
        { error: "Building is not valid. Check Colony Hub Exists / Not repeated / not already colonized" },
        { status: 400 }
      );
    
    //check enough resources
    if (!canBuild(corporation.resourcesNextRound, building))
      return NextResponse.json(
        { error: CANNOT_BUILD_ERROR_MESSAGE },
        { status: 400 }
      );

    //build
    await build(building, corporation, tile);

    //remove from other corporations
    await setTileAsColonized(corporation, tile);

    //respond with success
    return NextResponse.json({
      message: DATABASE_SUCCESSFULLY_UPDATED,
    });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id)
      return NextResponse.json(
        { error: "Missing necessary params in body" },
        { status: 400 }
      );

    //remove building from corporation
    const corporation = await corporationModel.findOne({
      buildingsOwned: body.id,
    });
    const corporationIndex = corporation.buildingsOwned.indexOf(body.id);

    corporation.buildingsOwned.splice(corporationIndex, 1);
    corporation.save();

    //remove building from tile
    const tile = await tileModel.findOne({ buildings: body.id });
    const tileIndex = tile.buildings.indexOf(body.id);
    tile.buildings.splice(tileIndex, 1);
    tile.save();

    //destroy building object
    await buildingModel.findByIdAndDelete(body.id);

    NextResponse.json({ message: "building destroyed" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
