import tileFixtures from "../../fixtures/tiles";
import tileModel from "./models/tile.model";
import firstRound from "../../fixtures/round";
import corporationModel from "./models/corporation.model";
import corporationFixtures from "../../fixtures/corporation";
import roundModel from "./models/round.model";
import buildingModel from "./models/building.model";
import alertModel from "./models/alert.model";
import { getAllTiles } from "./database.server";

//delete all models
export const deleteAllModels = async () => {
  await roundModel.deleteMany();
  await tileModel.deleteMany();
  await alertModel.deleteMany();
  await buildingModel.deleteMany();
  await corporationModel.deleteMany();
}

export async function createAllCorporations() {
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
  await corporationModel.create(corporationFixtures);
}

export const createAllTiles = async () => {
  //tiles
  await tileModel.deleteMany();
  const newTiles = await tileModel.create(tileFixtures);
  return newTiles;
}

export const seedDB = async () => {

  await deleteAllModels();

  //round reset
  await roundModel.create(firstRound);

  //tiles
  const tiles = await createAllTiles();

  //corporations
  await createAllCorporations();

  //create empty alert
  await alertModel.create({ message: '' })

  console.log("================== DATABASE SEEDED ==================");
};
