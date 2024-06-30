import { seedDB } from "../src/functions/database/database.seeder";
import { closeDatabase, dbConnect } from "../src/functions/database/database.server";
import corporationModel from "../src/functions/database/models/corporation.model";
import tileModel from "../src/functions/database/models/tile.model";
import buildingModel from "../src/functions/database/models/building.model";
import getBuildingList, { COLONY_HUB, ICE_MINE, ROCK_MINE } from "../src/fixtures/buildings.fixtures";
import { Building, Corporation } from "../src/types";
import { isValidBuilding } from "../src/app/api/build/build.functions";
import { COLONY_HUB_NAME, ICE_MINE_NAME, ROCK_MINE_NAME } from "../src/constants";
import { Tile } from "../src/types";
import { prepareEnv } from "./loadTests";
import { build } from "../src/app/api/build/build.functions";

describe('build tests', () => {
  let corporations: Corporation[];
  let tiles: Tile[];

  beforeAll(async () => {
    prepareEnv();
    await dbConnect();
  })
  describe('validation', () => {

    beforeAll(async () => {

      await seedDB();

      corporations = await corporationModel.find();
      tiles = await tileModel.find();

      //setup colony hub in tiles[0]
      const colonyHub0: Building = {
        ...COLONY_HUB,
        owner: corporations[0]._id,
        tile: tiles[0]
      }
      const colonyHubDB0 = await buildingModel.create(colonyHub0);
      //set to tile
      tiles[0].buildings = [colonyHubDB0._id];
      if (tiles[0].save)
        await tiles[0].save();

      //setup colony hub and ice mine in tiles[1]
      const colonyHub1: Building = {
        ...COLONY_HUB,
        owner: corporations[0]._id,
        tile: tiles[1]
      }
      const rockMine1: Building = {
        ...ROCK_MINE,
        owner: corporations[0]._id,
        tile: tiles[1]
      }
      const colonyHubDB1 = await buildingModel.create(colonyHub1);
      const rockMineDB1 = await buildingModel.create(rockMine1);
      tiles[1].buildings = [colonyHubDB1._id, rockMineDB1._id];

      //setup ice mine in queue for tiles[1]
      const iceMine: Building = {
        ...ICE_MINE,
        owner: corporations[0]._id,
        tile: tiles[1]
      }
      const iceMineDB = await buildingModel.create(iceMine);
      corporations[0].newBuildingsNextRound = [iceMineDB];

      //setup colony hub from enemy in tiles[2]
      const enemyColonyHub: Building = {
        ...COLONY_HUB,
        owner: corporations[1]._id,
        tile: tiles[2]
      }
      const enemyColonyHubDB = await buildingModel.create(enemyColonyHub);
      tiles[2].buildings = [enemyColonyHubDB._id];
    })

    test('invalid building - colony hub status', async () => {
      const validBuilding = await isValidBuilding(tiles[0], COLONY_HUB_NAME, corporations[0]);
      expect(validBuilding).toBeFalsy();
    });

    test('invalid building - repeated building - built', async () => {
      const validBuilding = await isValidBuilding(tiles[1], ROCK_MINE_NAME, corporations[0]);
      expect(validBuilding).toBeFalsy();
    });

    test('invalid building - repeated building - building queue', async () => {
      const validBuilding = await isValidBuilding(tiles[1], ICE_MINE_NAME, corporations[0]);
      expect(validBuilding).toBeFalsy;
    });

    test('invalid building - is enemy colony', async () => {
      const validBuilding = await isValidBuilding(tiles[2], COLONY_HUB_NAME, corporations[0]);
      expect(validBuilding).toBeFalsy();

    });

    test('valid building', async () => {
      const validBuilding = await isValidBuilding(tiles[3], COLONY_HUB_NAME, corporations[0]);
      expect(validBuilding).toBeTruthy();
    })
  })

  describe('build', () => {
    beforeAll(async () => {
      await seedDB();
    })

    test('build a colony hub', async () => {
      const allBuildings = getBuildingList();
      for (const building of allBuildings) {
        //search models each time so they are updated
        let firstCorp = await corporationModel.findOne();
        const firstTile = await tileModel.findOne();

        //store current resources
        const resourcesPre = JSON.parse(JSON.stringify(firstCorp.resourcesOwned));
        const resourcesNextRoundPre = JSON.parse(JSON.stringify(firstCorp.resourcesNextRound));

        //build
        await build(building, firstCorp, firstTile);

        //get corp info again
        firstCorp = await corporationModel.findOne();
        const resourcesPost = firstCorp.resourcesOwned;
        const resourcesNextRoundPost = firstCorp.resourcesNextRound;

        //check cost
        const buildingCost = building.buildingCost;
        const dailyCost = building.dailyCost;
        const dailyProd = building.dailyProduction;
        for (const resourceIndex in buildingCost) {
          const pre = Number(resourcesPre[resourceIndex].quantity);
          const preNextRound = Number(resourcesNextRoundPre[resourceIndex].quantity);
          const cost = Number(buildingCost[resourceIndex].quantity);
          const daily = Number(dailyCost[resourceIndex].quantity);
          const prod = Number(dailyProd[resourceIndex].quantity);
          const post = Number(resourcesPost[resourceIndex].quantity);
          const postNextRound = Number(resourcesNextRoundPost[resourceIndex].quantity);

          const costMatches = pre - cost === post;
          expect(costMatches).toBeTruthy();

          const dailyCostMatches = preNextRound - cost - daily + prod === postNextRound;
          expect(dailyCostMatches).toBeTruthy();
        }
      }
    })

  })

  afterAll(async () => {
    await closeDatabase();
  })
})