import {
  CANNOT_BUILD_ERROR_MESSAGE,
  COLONY_HUB_NAME,
  TILE_ALREADY_COLONIZED,
  elementMissingFromBody,
  elementNotFoundInDatabase,
} from "@/constants";
import buildingModel from "@/functions/database/models/building.model";
import corporationModel from "@/functions/database/models/corporation.model";
import tileModel from "@/functions/database/models/tile.model";
import { canBuild } from "@/functions/roundManager";
import { Tile } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    //building type must be in body
    if (!body.buildingType) {
      return NextResponse.json(
        { error: elementMissingFromBody("buildingType") },
        { status: 400 }
      );
    }

    if (!body.owner) {
      return NextResponse.json(
        { error: elementMissingFromBody("corporation owner") },
        { status: 400 }
      );
    }

    if (!body.tile) {
      return NextResponse.json(
        { error: elementMissingFromBody("tile") },
        { status: 400 }
      );
    }

    //find corporation in database
    const corporation = await corporationModel.findOne({
      name: body.owner,
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
    const tile = await tileModel.findOne(tileParams).populate("buildings");
    if (!tile)
      return NextResponse.json(
        { message: elementNotFoundInDatabase("tile") },
        { status: 500 }
      );

    const buildingsOnTile = tile.buildings;
    //check colony hub in tile
    if (buildingsOnTile.length === 0)
      return NextResponse.json(
        { error: "First building of a tile must be Colony Hub" },
        { status: 400 }
      );

    //check enough resources
    if (!canBuild(corporation.resourcesNextRound, body))
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
      ...body,
      owner: corporation._id,
      tile: tile._id,
    });

    //update corporation resources
    for (const resourceNeeded of body.buildingCost) {
      for (const index in corporation.resourcesNextRound) {
        const corpResource = corporation.resourcesNextRound[index];
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

    return NextResponse.json({ message: "built building" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
