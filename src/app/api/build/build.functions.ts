import { BuildingConstant, Resource } from "@/types";

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