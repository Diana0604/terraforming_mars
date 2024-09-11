//============================ API CONSTANTS ====================

import { InitTile } from "./types";

//api variables
export const BASE_API_URL = "/api";
export const RESET_DATABASE_ROUTE = `${BASE_API_URL}/reset`;
export const RESOURCE_DATABASE_ROUTE = `${BASE_API_URL}/resource`;
export const BUILD_DATABASE_ROUTE = `${BASE_API_URL}/build`;
export const CORPORATION_ROUTE = `${BASE_API_URL}/corporation`;
export const TILE_ROUTE = `${BASE_API_URL}/tile`;
export const ROUND_MANAGER_ROUTE = `${BASE_API_URL}/round`;
export const ALERT_MANAGER_ROUTE = `${BASE_API_URL}/alert`;
export const SKIP_TO_DARK = `${ROUND_MANAGER_ROUTE}/skip`;
export const READY_FOR_NEXT_ROUND_ROUTE = `${ROUND_MANAGER_ROUTE}/nextround`;

//api for init stats
export const INIT_CORPORATION_ROUTE = `${BASE_API_URL}/corporation/init`;
export const INIT_RESOURCE_ROUTE = `${BASE_API_URL}/resource/init`;
export const INIT_BUILDINGS_ROUTE = `${BASE_API_URL}/build/init`;
export const INITSTATS_ROUTE = `${BASE_API_URL}/initialstats`;

//success messages
export const DATABASE_SUCCESSFULLY_UPDATED =
  "database has been successfully updated";

//error messages
export const elementNotFoundInDatabase = (element: string) =>
  `${element} NOT FOUND in database`;
export const elementMissingFromBody = (element: string) =>
  `${element} MUST BE in body of request`;
export const invalidParameter = (
  parameterName: string,
  parameterGiven: string
) => `${parameterGiven} is not valid as a ${parameterName}`;
export const CANNOT_BUILD_ERROR_MESSAGE =
  "There are not enough resources for this building";
export const TILE_ALREADY_COLONIZED =
  "This tile has already been colonized by another team";

//============================= GAME CONSTANTS ==========================

//round body possible params (how to do enums?)
export const PLAY_GAME = 1;
export const PAUSE_GAME = 2;

//world variables
export const MAP_COLUMNS: String[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
];
export const MAP_ROWS: Number[] = [1, 2, 3, 4, 5];

export const initTiles: InitTile[] = [
  {
    column: "A",
    row: 1,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "B",
    row: 1,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "B",
    row: 2,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "C",
    row: 1,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "C",
    row: 2,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "C",
    row: 3,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "D",
    row: 1,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "D",
    row: 2,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "D",
    row: 3,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "D",
    row: 4,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "E",
    row: 1,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "E",
    row: 2,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "E",
    row: 3,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "E",
    row: 4,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "E",
    row: 5,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "F",
    row: 1,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "F",
    row: 2,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "F",
    row: 3,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "F",
    row: 4,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "G",
    row: 1,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "G",
    row: 2,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "G",
    row: 3,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "G",
    row: 4,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "G",
    row: 5,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "H",
    row: 1,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "H",
    row: 2,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "H",
    row: 3,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "H",
    row: 4,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "I",
    row: 1,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "I",
    row: 2,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "I",
    row: 3,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "J",
    row: 1,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "J",
    row: 2,
    resourcesAvailable: [],
    hazards: [],
  },
  {
    column: "K",
    row: 1,
    resourcesAvailable: [],
    hazards: [],
  },
];

//resources
export const RARE_METAL_NAME = "Rare Metal";
export const WATER_NAME = "Water";
export const OXYGEN_NAME = "Oxygen";
export const FOOD_NAME = "Food";
export const SYNTHETICS_NAME = "Synthetics";
export const MINERALS_NAME = "Minerals";

//buildings
export const COLONY_HUB_NAME = "Colony Hub";
export const ROCK_MINE_NAME = "Rock Mine";
export const ICE_MINE_NAME = "Ice Mine";
export const FACTORY_NAME = "Factory";
export const BIOME_FARM_NAME = "Biome/Farm";
export const TEMPLE_NAME = "Temple";
export const BARRACKS_NAME = "Barracks";
export const THEATRE_NAME = "Theatre";
export const SCHOOL_NAME = "School";
export const UNIVERSITY_NAME = "University";
export const HOSPITAL_NAME = "Hospital";
export const SCIENCE_LAB_NAME = "Science Lab";
export const LAUNCH_PAD_NAME = "Launch Pad";
export const SUPERCONDUCTOR_NAME = "Superconductor";


