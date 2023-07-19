import tileFixtures from "../../fixtures/tiles";
import tileModel from "./models/tile.model";
import corporationModel from "./models/corporation.model";
import corporationFixtures from "@/fixtures/corporation";
import { RESOURCES_LIST } from "@/constants";

export const seedDB = async () => {
  //tiles
  await tileModel.deleteMany();
  await tileModel.create(tileFixtures);

  //corporations
  //fill resources
  for (const corporation of corporationFixtures) {
    for (const resourceName of RESOURCES_LIST) {
      //check if resource already exists in fixtures
      const initResourceValue = corporation.resourcesOwned.filter((resource) => {
        return resource.name === resourceName;
      });
      if (initResourceValue && initResourceValue[0]) continue;

      //add resource set to 0 quantity if it doesn't exist
      corporation.resourcesOwned.push({ name: resourceName, quantity: 0 });
    }
  }
  //add to db
  await corporationModel.deleteMany();
  await corporationModel.create(corporationFixtures);

  console.log("================== DATABASE SEEDED ==================");
};
