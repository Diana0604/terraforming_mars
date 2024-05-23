//============================ API CONSTANTS ====================
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


