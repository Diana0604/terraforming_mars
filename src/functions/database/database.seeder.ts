import mapFixtures from "../../fixtures/tiles";
import TileModel from "./models/tile.model";

export const seedDB = async () => {
  await TileModel.deleteMany({});
  await TileModel.create(mapFixtures);
  console.log("================== DATABASE SEEDED ==================");
};
