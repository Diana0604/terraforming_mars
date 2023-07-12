import mapFixtures from "../../fixtures/tiles";
import HexagonModel from "./models/hexagon.model";

export const seedDB = async () => {
  await HexagonModel.deleteMany({});
  await HexagonModel.create(mapFixtures);
  console.log("================== DATABASE SEEDED ==================");
};
