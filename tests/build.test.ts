import { seedDB } from "../src/functions/database/database.seeder";
import { closeDatabase, dbConnect } from "../src/functions/database/database.server";
import corporationModel from "../src/functions/database/models/corporation.model";
import tileModel from "../src/functions/database/models/tile.model";
import buildingModel from "../src/functions/database/models/building.model";
import { COLONY_HUB, ICE_MINE, ROCK_MINE } from "../src/fixtures/buildings.fixtures";
import { Building, Corporation } from "../src/types";
import { isValidBuilding } from "../src/app/api/build/build.functions";
import { COLONY_HUB_NAME, ICE_MINE_NAME, ROCK_MINE_NAME } from "../src/constants";
import { Tile } from "../src/types";
import { prepareEnv } from "./loadTests";

describe('build tests', () => {
  let corporations: Corporation[];
  let tiles: Tile[];

  beforeAll(async () => {
    prepareEnv();
    await dbConnect();

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
  afterAll(async () => {
    await closeDatabase();
  })
})