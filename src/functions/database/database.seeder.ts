import tileFixtures from "../../fixtures/tiles";
import tileModel from "./models/tile.model";
import factionModel from "./models/faction.model";
import factionFixtures from "@/fixtures/factions";

export const seedDB = async () => {
  //tiles
  await tileModel.deleteMany();
  await tileModel.create(tileFixtures);
  //factions
  await factionModel.deleteMany();
  await factionModel.create(factionFixtures);
  console.log("================== DATABASE SEEDED ==================");
};
