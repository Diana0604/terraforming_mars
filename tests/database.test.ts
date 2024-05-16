import { createAllCorporations, createAllTiles, deleteAllModels, seedDB } from "../src/functions/database/database.seeder";
import { closeDatabase, dbConnect } from "../src/functions/database/database.server";
import tileFixtures from "../src/fixtures/tiles";
import corporationFixtures from "../src/fixtures/corporation";
import firstRound from "../src/fixtures/round";
import tileModel from "../src/functions/database/models/tile.model";
import roundModel from "../src/functions/database/models/round.model";
import corporationModel from "../src/functions/database/models/corporation.model";
import { compareTiles, compareCorporations } from "../src/functions/comparers";

process.env.mongoUri = "mongodb://127.0.0.1:27017/terraforming-mars";

describe('database tests', () => {

  beforeAll(async () => {
    //sort fixtures
    tileFixtures.sort(compareTiles);
    corporationFixtures.sort(compareCorporations);

    await dbConnect();
  })

  describe('seeders', () => {

    beforeEach(async () => {
      await deleteAllModels();
    })

    test('tiles', async () => {
      const tiles = await createAllTiles();
      expect(tiles).toMatchObject(tileFixtures);
    });

    test('corporations', async () => {
      const corporations = await createAllCorporations();
      expect(corporations).toMatchObject(corporationFixtures);
    })

    test('seeder function', async () => {
      await seedDB();

      //check roud
      const round = await roundModel.find();
      expect(round.length).toBe(1);
      expect(round[0]).toMatchObject(firstRound);

      //check tiles
      const tiles = await tileModel.find();
      tiles.sort(compareTiles);
      expect(tiles).toMatchObject(tileFixtures);

      //check corps
      const corporations = await corporationModel.find();
      corporations.sort(compareCorporations);
      expect(corporations).toMatchObject(corporationFixtures);
    })
  })

  afterAll(async () => {
    await closeDatabase();
  })
});