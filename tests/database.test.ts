import { createAllCorporations, createAllTiles, deleteAllModels } from "../src/functions/database/database.seeder";
import { closeDatabase, dbConnect } from "../src/functions/database/database.server";
import tileFixtures from "../src/fixtures/tiles";
import corporationFixtures from "../src/fixtures/corporation";
import { compareWithDatabase } from "./helpers";

process.env.mongoUri = "mongodb://127.0.0.1:27017/terraforming-mars";

describe('database tests', () => {

  beforeAll(async () => {
    await dbConnect();
  })

  describe('seeders', () => {

    beforeEach(async () => {
      await deleteAllModels();
    })

    test('tiles', async () => {
      const tiles = await createAllTiles();

      for (const index in tiles) {
        expect(compareWithDatabase(tileFixtures[index], tiles[index])).toBe(true);
      }

    });

    test('corporations', async () => {
      const corporations = await createAllCorporations();

      for (const index in corporations) {
        expect(compareWithDatabase(corporationFixtures[index], corporations[index]))
      }
    })
  })

  afterAll(async () => {
    await closeDatabase();
  })
});