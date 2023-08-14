import { BuildingConstant, Resource, Round } from "@/types";
import { dbConnect } from "./database/database.server";
import roundModel from "./database/models/round.model";
import { SECONDS_PER_ROUND, SECONDS_UPDATER_INTERVAL } from "@/constants";
import corporationModel from "./database/models/corporation.model";
import tileModel from "./database/models/tile.model";
import buildingModel from "./database/models/building.model";
import { Schema } from "mongoose";

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

let roundInterval: NodeJS.Timer;

const roundUpdater = async () => {
  //get round
  const currentRound = await roundModel.findOne();
  //decrease 5 seconds
  currentRound.timeLeftInSeconds =
    Number(currentRound.timeLeftInSeconds) - SECONDS_UPDATER_INTERVAL;
  await currentRound.save();

  //pause round (dark hour reached)
  if (currentRound.timeLeftInSeconds < SECONDS_UPDATER_INTERVAL) {
    return await pauseGame();
  }
};

const changeRound = async () => {
  const corporations = await corporationModel.find();

  corporations.forEach((corporation) => {
    //get round by round updates
    const resourcesNextRound = corporation.resourcesNextRound;
    const newBuildingsNextRound = corporation.newBuildingsNextRound;

    //update new round updates
    corporation.resourcesOwned = resourcesNextRound;
    corporation.buildingsOwned = corporation.buildingsOwned.concat(
      newBuildingsNextRound
    );

    //update tiles
    corporation.buildingsOwned.forEach(
      async (buildingId: Schema.Types.ObjectId) => {
        const building = await buildingModel.findById(buildingId);
        const tile = await tileModel.findById(building.tile);
        if (!tile.buildings) tile.bildings = [];
        tile.buildings.push(building);
        await tile.save();
      }
    );

    //reset next round building updates
    corporation.newBuildingsNextRound = [];

    //save corporation
    corporation.save();
  });
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

  //check if we need to start a new round
  if (currentRound.timeLeftInSeconds < SECONDS_UPDATER_INTERVAL) {
    if (currentRound.timeLeftInSeconds < 0) currentRound.timeLeftInSeconds = 0;
    currentRound.darkHour = false;
    currentRound.number = Number(currentRound.number) + 1;
    currentRound.timeLeftInSeconds = SECONDS_PER_ROUND;
  }

  currentRound.playing = true;

  //update database object
  await currentRound.save();

  //play if needs playing
  roundInterval = setInterval(roundUpdater, SECONDS_UPDATER_INTERVAL * 1000);

  return currentRound;
};

export const pauseGame = async () => {
  //connect to db
  await dbConnect();

  //pause interval
  clearInterval(roundInterval);

  //get current round
  const currentRound = await roundModel.findOne();

  //check if we need to go into dark mode
  currentRound.playing = false;
  if (currentRound.timeLeftInSeconds < SECONDS_UPDATER_INTERVAL) {
    currentRound.darkHour = true;
    changeRound();
  }

  //save current round
  await currentRound.save();

  return currentRound;
};
