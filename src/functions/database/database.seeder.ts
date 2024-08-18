import getFixtureTiles from "../../fixtures/tiles.fixtures";
import tileModel from "./models/tile.model";
import firstRound from "../../fixtures/round.fixtures";
import corporationModel from "./models/corporation.model";
import getCorporationFixtures from "../../fixtures/corporations.fixtures";
import roundModel from "./models/round.model";
import buildingModel from "./models/building.model";
import alertModel from "./models/alert.model";
import { getAllTiles } from "./database.server";
import { Corporation, Tile, RESET_DB_ACTION } from "../../types";
import initialcorpsModel from "./models/initialstats/initialcorps.model";
import initialbuildingModel from "./models/initialstats/initialbuilding.model";
import mongoose from "mongoose";

//delete all models
export const deleteAllModels = async (action: RESET_DB_ACTION) => {
  await roundModel.deleteMany();
  if (action === RESET_DB_ACTION.SEED) {
    await tileModel.deleteMany();
    await alertModel.deleteMany();
  }
  await buildingModel.deleteMany();
  await corporationModel.deleteMany();
}

export async function createAllCorporations() {

  const corporationFixtures: Corporation[] = getCorporationFixtures();

  for (const corporation of corporationFixtures) {

    //set up resources next round
    corporation.resourcesNextRound = corporation.resourcesOwned;

    //add empty buildings list
    corporation.buildingsOwned = [];

    //add tilesCanBuild as all tiles
    corporation.tilesCanBuild = [];

    //reset tiles
    const allTiles = await getAllTiles();
    for (const tile of allTiles) {
      corporation.tilesCanBuild.push(tile._id);
    }
  }
  //add to db
  await corporationModel.deleteMany();
  return await corporationModel.create(corporationFixtures);
}

export const createAllTiles = async () => {
  const tileFixtures: Tile[] = getFixtureTiles();
  //tiles
  await tileModel.deleteMany();
  const newTiles = await tileModel.create(tileFixtures);
  return newTiles;
}

export const seedDB = async () => {

  await deleteAllModels(RESET_DB_ACTION.SEED);

  //round reset
  await roundModel.create(firstRound);

  //tiles
  await createAllTiles();

  //corporations
  await createAllCorporations();

  //create empty alert
  await alertModel.create({ message: '' })

  console.log("================== DATABASE SEEDED ==================");
};

export const resetDB = async () => {
  await deleteAllModels(RESET_DB_ACTION.GAME_RESET);

  //round reset
  const initBuildings = await initialbuildingModel.find();
  for (const building of initBuildings) {
    building._id = new mongoose.Types.ObjectId();
    building.isNew = true;
    await buildingModel.create(building);
  }

  const initCorporations = await initialcorpsModel.find();
  for (const corporation of initCorporations) {
    corporation._id = new mongoose.Types.ObjectId();
    corporation.isNew = true;
    corporation.resourcesNextRound = corporation.resourcesOwned;
    const newCorp = await corporationModel.create(corporation);
    newCorp.resourcesNextRound = corporation.resourcesOwned;
    await newCorp.save();
  }

  let round = await roundModel.findOne();
  if (!round) round = await roundModel.create({});
  round = await roundModel.findOne();
  round.number = 0;
  round.playing = false;
  round.darkHour = true;
  await round.save();

  const tiles = await tileModel.find();
  for (const tile of tiles) {
    tile.colonizedBy = null;
    tile.buildings = [];
    tile.destroyed = false;
    await tile.save();
  }
}