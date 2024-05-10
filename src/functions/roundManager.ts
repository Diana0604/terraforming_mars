import { BuildingConstant, Corporation, Resource, Round, Tile } from "@/types";
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
let roundTimeout: NodeJS.Timeout;

const endOfRound = async () => {
  //set round manager to next round
  const round: Round = await roundModel.findOne() as Round;

  round.playing = false;
  round.darkHour = true;
  round.pausedAt = undefined;

  if (round.save)
    await round.save();

  return round;
};

const updateCorporationStats = async () => {
  //get all corps with buildings populated
  const corporations: Corporation[] = await corporationModel
    .find()
    .populate("buildingsOwned")
    .populate("newBuildingsNextRound") as Corporation[];

  // //update each corporation - buildings
  corporations.forEach(async (corporation) => {
    //   //update tiles and resources next round
    if (!corporation.newBuildingsNextRound) return;


    for (const building of corporation.newBuildingsNextRound) {
      //get building

      building.tile = await tileModel.findById(building.tile) as Tile;

      //update tile
      const tile = building.tile;
      if (!tile.buildings) tile.buildings = [];
      tile.buildings.push(building as unknown as BuildingConstant);
      if (tile.save)
        await tile.save();
    }
    corporation.buildingsOwned = corporation.buildingsOwned.concat(corporation.newBuildingsNextRound);
    corporation.newBuildingsNextRound = [];

    //update resources cost and production from buildings own
    for (const building of corporation.buildingsOwned) {
      //get building
      for (const resource of building.dailyProduction) {
        corporation.resourcesOwned[resource.resourceId].quantity += resource.quantity;
      }

      for (const resource of building.dailyCost) {
        corporation.resourcesOwned[resource.resourceId].quantity -= resource.quantity;
      }
    }

    if (corporation.save)
      corporation.save();
  })
};

const startNewRound = async (currentRound: Round) => {
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
  if (currentRound.save)
    await currentRound.save();

  //return round
  return currentRound;
};

export const playGame = async () => {
  //connect to db
  await dbConnect();

  //get round
  const currentRound: Round = await roundModel.findOne() as Round;
  if (!currentRound)
    throw Error("No Round found. Please reset database before continuing.");

  //check status
  if (currentRound.playing) return currentRound;
  const now = new Date();

  //if it's start of round -> just start timer
  if (currentRound.darkHour) {
    return await startNewRound(currentRound);
  }

  if (!currentRound.pausedAt)
    throw Error("Current round is not playing, is not at dark hour, and was never paused");
  if (!currentRound.startTime)
    throw Error("Current round is paused but didn't have start time");

  //get time ellapsed since paused
  const timePlayed = Number(currentRound.pausedAt.getTime()) - Number(currentRound.startTime.getTime());

  //create a new starting time according to when it needs to be
  currentRound.playing = true;
  currentRound.startTime = new Date(Number(new Date().getTime()) - timePlayed);

  //set timeout to change round at end of turn
  roundTimeout = setTimeout(endOfRound, (SECONDS_PER_ROUND * 1000 - timePlayed));

  //update database object
  if (currentRound.save)
    await currentRound.save();

  return currentRound;
};

export const pauseGame = async () => {
  //connect to db
  await dbConnect();

  //clear timeout
  clearTimeout(roundTimeout);

  //get current round
  const currentRound: Round = await roundModel.findOne() as Round;

  //set playing to false
  currentRound.playing = false;

  //set paused date as noew
  currentRound.pausedAt = new Date();

  //save current round
  if (currentRound.save)
    await currentRound.save();
  return currentRound;
};

export const skipToDarkHour = async () => {
  const currentRound: Round = await pauseGame();
  currentRound.darkHour = true;
  currentRound.startTime = new Date(
    Number(new Date().getTime()) - (SECONDS_PER_ROUND - 1) * 1000
  );
  if (currentRound.save)
    currentRound.save();

  return currentRound;
};
