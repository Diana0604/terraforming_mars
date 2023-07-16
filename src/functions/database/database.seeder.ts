import tileFixtures from "../../fixtures/tiles";
import tileModel from "./models/tile.model";
import factionModel from "./models/faction.model";
import factionFixtures from "@/fixtures/factions";
import { RESOURCES_LIST } from "@/constants";

export const seedDB = async () => {
  //tiles
  await tileModel.deleteMany();
  await tileModel.create(tileFixtures);

  //factions
  //fill resources
  for (const faction of factionFixtures) {
    for (const resourceName of RESOURCES_LIST) {
      //check if resource already exists in fixtures
      const initResourceValue = faction.resourcesOwned.filter((resource) => {
        return resource.name === resourceName;
      });
      if (initResourceValue && initResourceValue[0]) continue;

      //add resource set to 0 quantity if it doesn't exist
      faction.resourcesOwned.push({ name: resourceName, quantity: 0 });
    }
  }
  //add to db
  await factionModel.deleteMany();
  await factionModel.create(factionFixtures);

  console.log("================== DATABASE SEEDED ==================");
};
