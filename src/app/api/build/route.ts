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
  TILE_ALREADY_COLONIZED,
  DATABASE_SUCCESSFULLY_UPDATED,
  COLONY_HUB_NAME,
} from "@/constants";

//function helpers
import { canBuild } from "@/functions/roundManager";
import buildingModel from "@/functions/database/models/building.model";
import { Tile } from "@/types";

export async function POST(request: NextRequest) {
  try {
    //connect to db
    await dbConnect();

    //check request contains appropriate body
    const building = await request.json();
    if (!building.corporation)
      return NextResponse.json(
        { error: elementMissingFromBody("corporation") },
        { status: 400 }
      );
    if (!building.buildingType)
      return NextResponse.json(
        { error: elementMissingFromBody("buildingType") },
        { status: 400 }
      );
    if (!building.tile)
      return NextResponse.json(
        { error: elementMissingFromBody("tile") },
        { status: 400 }
      );

    //find corporation in database
    const corporation = await corporationModel.findOne({
      name: building.corporation,
    });
    if (!corporation)
      return NextResponse.json(
        { error: elementNotFoundInDatabase("corporation") },
        { status: 500 }
      );

    //find tile in database
    const tileParams = {
      column: building.tile[0],
      row: Number(building.tile[1]),
    };
    const tile = await tileModel.findOne(tileParams).populate("buildings");
    if (!tile)
      return NextResponse.json(
        { message: elementNotFoundInDatabase("tile") },
        { status: 500 }
      );

    const buildingsOnTile = tile.buildings;
    //check colony hub in tile
    if (
      buildingsOnTile.length === 0 &&
      building.buildingType != COLONY_HUB_NAME
    )
      return NextResponse.json(
        { error: "First building of a tile must be Colony Hub" },
        { status: 400 }
      );

    //check building of this type does not yet exist
    const otherBuilding = await buildingModel.count({
      tile: tile._id,
      buildingType: building.buildingType,
    });

    if (otherBuilding) {
      return NextResponse.json(
        { error: "Tile already has this building" },
        { status: 400 }
      );
    }

    //check enough resources
    if (!canBuild(corporation.resourcesNextRound, building))
      return NextResponse.json(
        { error: CANNOT_BUILD_ERROR_MESSAGE },
        { status: 400 }
      );

    //check tile available
    if (
      tile.colonizedBy &&
      tile.colonizedBy.toString() != corporation._id.toString()
    ) {
      return NextResponse.json(
        { message: TILE_ALREADY_COLONIZED },
        { status: 400 }
      );
    }

    //create building
    const buildingObject = await buildingModel.create({
      ...building,
      owner: corporation._id,
      tile: tile._id,
    });

    //update corporation resources
    for (const resourceNeeded of building.buildingCost) {
      for (const index in corporation.resourcesNextRound) {
        const corpResource = corporation.resourcesNextRound[index];
        if (resourceNeeded.name === corpResource.name) {
          corpResource.quantity =
            Number(corpResource.quantity) - resourceNeeded.quantity;
          continue;
        }
      }

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
    if (!corporation.newBuildingsNextRound)
      corporation.newBuildingsNextRound = [];
    corporation.newBuildingsNextRound.push(buildingObject._id);

    //save corporation object
    await corporation.save();

    //update colonization status for tile if necessary
    if (!tile.colonizedBy) {
      tile.colonizedBy = corporation._id;
    }

    await tile.save();

    //remove tile from other corporations
    const otherCorps = await corporationModel.find();
    for (const otherCorp of otherCorps) {
      if (otherCorp.name === corporation.name) continue;
      const tileIndex = otherCorp.tilesCanBuild.filter((otherTile: Tile) => {
        return (
          otherTile._id && otherTile._id.toString() === tile._id.toString()
        );
      });
      if (tileIndex.length === 0) break;
      otherCorp.tilesCanBuild.splice(tileIndex, 1);
      await otherCorp.save();
    }

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
