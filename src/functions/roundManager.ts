import { BuildingConstant, Resource } from "@/types";
import { dbConnect } from "./database/database.server";
import roundModel from "./database/models/round.model";
import { SECONDS_PER_ROUND } from "@/showVariables";
import corporationModel from "./database/models/corporation.model";
import tileModel from "./database/models/tile.model";

/**
 * Given a list of resources and a building to be built, check if there's enough resources to build it
 * @param resources - array of resources
 * @param building - building that team wants to beald
 * @returns boolean
 */
export const canBuild = (resources: Resource[], building: BuildingConstant) => {
  const buildingCost = building.buildingCost;

  for (const resource of buildingCost) {
    //get the resource which names matches from the resources vector
    const matchingResourcesVector = resources.filter((value: Resource) => {
      return value.name === resource.name;
    });

    //if vector length is 0 => resource is not present
    if (matchingResourcesVector.length === 0) return false;

    //get specific resource value
    const matchingResource = matchingResourcesVector[0];

    //compare quantities
    if (matchingResource.quantity < resource.quantity) return false;
  }
  return true;
};

let roundTimeout: NodeJS.Timer;

const endOfRound = async () => {
  //set round manager to next round
  const round = await roundModel.findOne();

  round.playing = false;
  round.darkHour = true;
  round.pausedAt = undefined;

  await round.save();
};

const updateCorporationStats = async () => {
  //get all corps with buildings populated
  const corporations = await corporationModel
    .find()
    .populate("buildingsOwned")
    .populate("newBuildingsNextRound");

  //update each corporation
  corporations.forEach(async (corporation) => {
    //update tiles and resources next round
    for (const building of corporation.newBuildingsNextRound) {
      //get building
      building.tile = await tileModel.findById(building.tile);

      //update tile
      const tile = building.tile;
      if (!tile.buildings) tile.buildings = [];
      tile.buildings.push(building);
      await tile.save();
    }

    //copy round by round updates as independent object
    const resourcesNextRound = [...corporation.resourcesNextRound];
    const newBuildingsNextRound = [...corporation.newBuildingsNextRound];

    //update new round updates
    corporation.resourcesOwned = resourcesNextRound;
    corporation.buildingsOwned = corporation.buildingsOwned.concat(
      newBuildingsNextRound
    );

    for (const building of corporation.buildingsOwned) {
      //it's a non custom building
      for (const resource of building.dailyCost) {
        for (const corporationResource of corporation.resourcesNextRound) {
          if (resource.name === corporationResource.name) {
            corporationResource.quantity =
              Number(corporationResource.quantity) - Number(resource.quantity);
            continue;
          }
        }
      }

      //update resources next round from building daily production
      for (const resource of building.dailyProduction) {
        for (const corporationResource of corporation.resourcesNextRound) {
          if (resource.name === corporationResource.name) {
            corporationResource.quantity =
              Number(corporationResource.quantity) + Number(resource.quantity);
            continue;
          }
        }
      }
    }

    //reset next round building updates
    corporation.newBuildingsNextRound = [];

    //save corporation
    corporation.save();
  });
};

const startNewRound = async (currentRound: {
  startTime: Date;
  playing: boolean;
  darkHour: boolean;
  number: number;
  save: () => any;
}) => {
  //update corporations
  await updateCorporationStats();

  //set starting time
  currentRound.startTime = new Date();
  currentRound.playing = true;
  currentRound.darkHour = false;
  currentRound.number = currentRound.number + 1;

  //set timeout to change round at end of turn
  roundTimeout = setTimeout(endOfRound, SECONDS_PER_ROUND * 1000);

  //save round
  await currentRound.save();

  //return round
  return currentRound;
};

export const playGame = async () => {
  //connect to db
  await dbConnect();

  //get round
  const currentRound = await roundModel.findOne();
  if (!currentRound)
    throw Error("No Round found. Please reset database before continuing.");

  //check status
  if (currentRound.playing) return currentRound;
  const now = new Date();

  //if it's start of round -> just start timer
  if (currentRound.darkHour) {
    return await startNewRound(currentRound);
  }

  //get time ellapsed since paused
  console.log('getting: ', now, '-', currentRound.pausedAt)
  const timeEllapsed = Number(now.getTime()) - Number(currentRound.pausedAt.getTime());
  console.log('time ellapsed is', timeEllapsed)

  //create a new starting time according to when it needs to be
  currentRound.startTime = new Date(Number(new Date().getTime()) - timeEllapsed);
  currentRound.playing = true;

  //set timeout to change round at end of turn
  console.log('timeout for', (SECONDS_PER_ROUND * 1000 - timeEllapsed))
  setTimeout(endOfRound, (SECONDS_PER_ROUND * 1000 - timeEllapsed));

  //update database object
  await currentRound.save();

  return currentRound;
};

export const pauseGame = async () => {
  //connect to db
  await dbConnect();

  //clear timeout
  clearTimeout(roundTimeout);

  //get current round
  const currentRound = await roundModel.findOne();

  //set playing to false
  currentRound.playing = false;

  //set paused date as noew
  currentRound.pausedAt = new Date();

  //save current round
  await currentRound.save();
  return currentRound;
};

export const skipToDarkHour = async () => {
  console.log("skipping to dark hour");
  const currentRound = await pauseGame();
  currentRound.darkHour = true;
  currentRound.startTime = new Date(
    Number(new Date().getTime()) - (SECONDS_PER_ROUND - 1) * 1000
  );
  console.log(currentRound.startTime);
  currentRound.save();
};
