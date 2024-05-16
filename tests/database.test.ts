import { createAllCorporations, createAllTiles, deleteAllModels, seedDB } from "../src/functions/database/database.seeder";
import { closeDatabase, dbConnect, getAllTiles } from "../src/functions/database/database.server";
import tileFixtures from "../src/fixtures/tiles";
import corporationFixtures from "../src/fixtures/corporation";
import firstRound from "../src/fixtures/round";
import tileModel from "../src/functions/database/models/tile.model";
import roundModel from "../src/functions/database/models/round.model";
import corporationModel from "../src/functions/database/models/corporation.model";
import { compareTiles, compareCorporations } from "../src/functions/comparers";
import { COLONY_HUB } from "../src/showVariables";
import buildingModel from "../src/functions/database/models/building.model";
import { Building, Corporation } from "@/types";

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
    });

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

  describe('server', () => {

    describe('get tiles', () => {
      let corporation: Corporation | null;
      let building: Building;
      beforeAll(async () => {
        //create tiles and corporations
        await createAllTiles();
        await createAllCorporations();

        //get corporation and tile
        corporation = await corporationModel.findOne();

        if (!corporation) throw Error("test failed in prep phase");

        const tile = await tileModel.findOne({ column: 'A', row: 1 });

        //add building and colonization to tile
        building = await buildingModel.create(COLONY_HUB);
        tile.buildings.push(building._id);
        tile.colonizedBy = corporation._id;
        await tile.save();
      })

      test('not populating', async () => {

        //get all tiles, info should be ids
        const tiles = await getAllTiles(false);

        //check necessary objects exist
        if (!building._id) throw Error("there has been an error at the beforeAll step");
        if (!corporation) throw Error("there has been an error at the beforeAll step");
        if (!corporation._id) throw Error("there has been an error at the beforeAll step");

        for (const tile of tiles) {

          //if tile is A1 -> expect object id's to match
          if (tile.column === 'A' && tile.row === 1) {
            expect(tile.buildings[0]).toMatchObject(building._id);
            expect(tile.colonizedBy).toMatchObject(corporation._id);
            continue;
          }

          //else, expect buildings and colonized to be empty
          expect(tile.buildings.length).toBe(0);
          expect(tile.colonizedBy).toBeUndefined();
        }
      })

      test('populating', async () => {
        const tiles = await getAllTiles(true);
        for (const tile of tiles) {
          if (tile.column === 'A' && tile.row === 1) {
            const tileBuilding = tile.buildings[0];

            //stringify and parse are necessary to prevent Maximum Call Stack Size Exceeded (self reference)
            expect(JSON.parse(JSON.stringify(tileBuilding))).toMatchObject(JSON.parse(JSON.stringify(building)));
            continue;
          }

          //else, expect buildings and colonized to be empty
          expect(tile.buildings.length).toBe(0);
          expect(tile.colonizedBy).toBeUndefined();
        }

      })
    });
  })

  afterAll(async () => {
    await closeDatabase();
  })
});