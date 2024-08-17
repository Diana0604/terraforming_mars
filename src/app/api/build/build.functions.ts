import corporationModel from "../../../functions/database/models/corporation.model";
import { COLONY_HUB_NAME } from "../../../constants";
import buildingModel from "../../../functions/database/models/building.model"
import { BuildingConstant, BuildingType, Corporation, Resource, Tile } from "../../../types";

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

const isEnemyColony = async (tile: Tile, corporation: Corporation) => {
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

export const build = async (building: BuildingConstant, corporation: Corporation, tile: Tile) => {
  if (!corporation.resourcesNextRound) throw Error("corporation is badly formatted");
  if (!corporation.save) throw Error("corporation is badly formatted");
  if (!tile.save) throw Error("tile is badly formatted");

  //create building
  const buildingObject = await buildingModel.create({
    dailyCost: building.dailyCost,
    dailyProduction: building.dailyProduction,
    buildingType: building.buildingType,
    owner: corporation._id,
    tile: tile._id,
  });

  //update corporation resources
  for (const index in building.buildingCost) {
    const resourceNeeded = building.buildingCost[index];
    const dailyCost = building.dailyCost[index];
    const dailyProduction = building.dailyProduction[index];
    corporation.resourcesNextRound[index].quantity -= resourceNeeded.quantity;
    corporation.resourcesNextRound[index].quantity -= dailyCost.quantity;
    corporation.resourcesNextRound[index].quantity += dailyProduction.quantity;
    corporation.resourcesOwned[index].quantity -= resourceNeeded.quantity;
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
}

export const setTileAsColonized = async (corporation: Corporation, tile: Tile) => {

  //remove tile from other corporations
  const otherCorps = await corporationModel.find();
  for (const otherCorp of otherCorps) {
    if (otherCorp.name === corporation.name) continue;
    const tileIndex = otherCorp.tilesCanBuild.filter((otherTile: Tile) => {
      if (!tile._id) throw Error("Tile is badly formatted");
      return (
        otherTile._id && otherTile._id.toString() === tile._id.toString()
      );
    });
    if (tileIndex.length === 0) break;
    otherCorp.tilesCanBuild.splice(tileIndex, 1);
    await otherCorp.save();
  }
}