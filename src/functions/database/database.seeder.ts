import tileFixtures from "../../fixtures/tiles";
import tileModel from "./models/tile.model";
import firstRound from "@/fixtures/round";
import corporationModel from "./models/corporation.model";
import corporationFixtures from "@/fixtures/corporation";
import roundModel from "./models/round.model";
import { RESOURCES_LIST } from "@/constants";
import buildingModel from "./models/building.model";

export const seedDB = async () => {
  //round reset
  await roundModel.deleteMany();
  await roundModel.create(firstRound);

  //tiles
  await tileModel.deleteMany();
  const newTiles = await tileModel.create(tileFixtures);

  //corporations

  for (const corporation of corporationFixtures) {
    //fill init resources
    for (const resourceName of RESOURCES_LIST) {
      //check if resource already exists in fixtures
      const initResourceValue = corporation.resourcesOwned.filter(
        (resource) => {
          return resource.name === resourceName;
        }
      );
      if (initResourceValue && initResourceValue[0]) continue;

      //add resource set to 0 quantity if it doesn't exist
      corporation.resourcesOwned.push({ name: resourceName, quantity: 0 });
    }

    //set up resources next round
    corporation.resourcesNextRound = corporation.resourcesOwned;

    //add empty buildings list
    corporation.buildingsOwned = [];

    //add tilesCanBuild as all tiles
    corporation.tilesCanBuild = [];

    for (const tile of newTiles) {
      corporation.tilesCanBuild.push(tile._id);
    }
  }
  //add to db
  await corporationModel.deleteMany();
  await corporationModel.create(corporationFixtures);

  //delete buildings
  await buildingModel.deleteMany();

  console.log("================== DATABASE SEEDED ==================");
};
