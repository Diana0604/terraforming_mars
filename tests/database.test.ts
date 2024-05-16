import { createAllCorporations, createAllTiles, deleteAllModels, seedDB } from "../src/functions/database/database.seeder";
import { closeDatabase, dbConnect } from "../src/functions/database/database.server";
import tileFixtures from "../src/fixtures/tiles";
import corporationFixtures from "../src/fixtures/corporation";
import firstRound from "../src/fixtures/round";
import { compareWithDatabase } from "./helpers";
import tileModel from "../src/functions/database/models/tile.model";
import roundModel from "../src/functions/database/models/round.model";
import corporationModel from "../src/functions/database/models/corporation.model";

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

    test('seeder function', async () => {
      await seedDB();

      //check roud
      const round = await roundModel.find();
      expect(round.length).toBe(1);
      expect(compareWithDatabase(firstRound, round[0])).toBe(true);


      //check tiles
      const tiles = await tileModel.find();
      for (const index in tiles) {
        //get fixture that matches row and column
        const fixtureTile = tileFixtures.find(tile => {
          return tile.column === tiles[index].column && tile.row === tiles[index].row;
        })
        //check fixture is defined
        expect(fixtureTile).toBeDefined();
        //compare with db object
        expect(compareWithDatabase(fixtureTile, tiles[index])).toBe(true);
      }

      //check corps
      const corporations = await corporationModel.find();
      for (const index in corporations) {
        const fixtureCorporation = corporationFixtures.find(corporation => {
          return corporation.name === corporations[index].name;
        })
        //check fixture is defined
        expect(fixtureCorporation).toBeDefined();
        //compare with db object
        expect(compareWithDatabase(fixtureCorporation, corporations[index]))
      }
    })
  })

  afterAll(async () => {
    await closeDatabase();
  })
});