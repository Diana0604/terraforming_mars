import tileFixtures from "../../fixtures/tiles";
import tileModel from "./models/tile.model";
import firstRound from "@/fixtures/round";
import corporationModel from "./models/corporation.model";
import corporationFixtures from "@/fixtures/corporation";
import roundModel from "./models/round.model";
import { RESOURCES_LIST } from "@/constants";
import buildingModel from "./models/building.model";
import alertModel from "./models/alert.model";

export async function createAllCorporations() {
  for (const corporation of corporationFixtures) {

    //set up resources next round
    corporation.resourcesNextRound = corporation.resourcesOwned;

    //add empty buildings list
    corporation.buildingsOwned = [];

    //add tilesCanBuild as all tiles
    corporation.tilesCanBuild = [];

    //reset tiles
    await tileModel.deleteMany();
    const allTiles = await createAllTiles();

    for (const tile of allTiles) {
      corporation.tilesCanBuild.push(tile._id);
    }
  }
  //add to db
  await corporationModel.deleteMany();
  await corporationModel.create(corporationFixtures);
}

const createAllTiles = async () => {
  //tiles
  await tileModel.deleteMany();
  const newTiles = await tileModel.create(tileFixtures);
  return newTiles;
}

export const seedDB = async () => {
  //round reset
  await roundModel.deleteMany();
  await roundModel.create(firstRound);

  //corporations
  createAllCorporations();

  await alertModel.deleteMany();
  await alertModel.create({ message: '' })

  //delete buildings
  await buildingModel.deleteMany();

  console.log("================== DATABASE SEEDED ==================");
};
