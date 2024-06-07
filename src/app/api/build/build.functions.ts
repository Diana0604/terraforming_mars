import { COLONY_HUB_NAME } from "@/constants";
import buildingModel from "@/functions/database/models/building.model";
import { BuildingConstant, BuildingType, Corporation, Resource, Tile } from "@/types";
import mongoose from "mongoose";

/**
 * Given a list of resources and a building to be built, check if there's enough resources to build it
 * @param resources - array of resources
 * @param building - building that team wants to beald
 * @returns boolean
 */
export const canBuild = (corporationResources: Resource[], building: BuildingConstant) => {
  // get building cost
  const buildingCost = building.buildingCost;

  //loop through resources
  for (const index in buildingCost) {
    const resource = buildingCost[index];
    //check if resources are available
    const corporationResource = corporationResources[index];
    if (corporationResource.quantity < resource.quantity) return false;
  }
  return true;
};

const colonyHubStatusIsValid = (buildingType: BuildingType, buildingsOnTile?: BuildingConstant[]) => {
  //colony hub is always valid
  if (buildingType === COLONY_HUB_NAME) return true;

  //there must be at least one building already
  if (!buildingsOnTile) return false;
  if (buildingsOnTile.length === 0) return false;

  //building list must contain a colony hub
  for (const building of buildingsOnTile) {
    if (building.buildingType === COLONY_HUB_NAME) return true;
  }

  //no colony hub was found
  return false;
}

const buildingIsRepeated = async (tile: Tile, buildingType: BuildingType) => {
  if (!tile._id) throw Error("tile is not a mongoose object");
  //check building of this type does not yet exist
  const otherBuilding = await buildingModel.countDocuments({
    tile: tile._id,
    buildingType: buildingType,
  });

  if (otherBuilding)
    return true;

  return false;
}

export const isEnemyColony = async (tile: Tile, corporation: Corporation) => {
  if (!corporation._id) throw Error("invalid corporation object received");

  //check tile available
  if (
    tile.colonizedBy &&
    tile.colonizedBy.toString() != corporation._id.toString()
  ) return true;

  return false;
}

export const isValidBuilding = async (tile: Tile, buildingType: BuildingType, corporation: Corporation) => {
  //check colony hub
  if (!colonyHubStatusIsValid(buildingType, tile.buildings)) return false;

  //check no repeat
  const buildingRepeated = await buildingIsRepeated(tile, buildingType);
  if (buildingRepeated) return false;

  //check colonization status
  const colonizedByEnemy = await isEnemyColony(tile, corporation);
  if (colonizedByEnemy) return false;

  return true;
}