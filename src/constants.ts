import { BuildingConstant } from "./types";
//============================ API CONSTANTS ====================
//api variables
export const BASE_API_URL = "/api";
export const RESET_DATABASE_ROUTE = `${BASE_API_URL}/reset`;
export const RESOURCE_DATABASE_ROUTE = `${BASE_API_URL}/resource`;
export const BUILD_DATABASE_ROUTE = `${BASE_API_URL}/build`;
export const CUSTOM_BUILD_DATABASE_ROUTE = `${BUILD_DATABASE_ROUTE}/custom`;
export const CORPORATION_ROUTE = `${BASE_API_URL}/corporation`;
export const TILE_ROUTE = `${BASE_API_URL}/tile`;
export const ROUND_MANAGER_ROUTE = `${BASE_API_URL}/round`;

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

//names of corporations
export const PLAYER_CORPORATION_NAME = "Player";
export const ACTORS_CORPORATION_NAME = "Actors";

//round management
export const SECONDS_PER_ROUND = 60*10; //10 mins

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

export const RESOURCES_LIST = [
  RARE_METAL_NAME,
  WATER_NAME,
  OXYGEN_NAME,
  FOOD_NAME,
  SYNTHETICS_NAME,
  MINERALS_NAME,
];

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

export const COLONY_HUB: BuildingConstant = {
  buildingType: COLONY_HUB_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 3 },
    { name: SYNTHETICS_NAME, quantity: 5 },
  ],
  dailyProduction: [{ name: OXYGEN_NAME, quantity: 5 }],
  dailyCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 3 },
  ],
};

export const ROCK_MINE: BuildingConstant = {
  buildingType: ROCK_MINE_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: MINERALS_NAME, quantity: 10 },
    { name: SYNTHETICS_NAME, quantity: 5 },
  ],
  dailyProduction: [
    { name: MINERALS_NAME, quantity: 20 },
    { name: RARE_METAL_NAME, quantity: 15 },
  ],
  dailyCost: [{ name: WATER_NAME, quantity: 5 }],
};

export const ICE_MINE: BuildingConstant = {
  buildingType: ICE_MINE_NAME,
  buildingCost: [
    { name: MINERALS_NAME, quantity: 10 },
    { name: SYNTHETICS_NAME, quantity: 10 },
    { name: WATER_NAME, quantity: 5 },
  ],
  dailyProduction: [
    { name: WATER_NAME, quantity: 20 },
    { name: RARE_METAL_NAME, quantity: 10 },
  ],
  dailyCost: [{ name: WATER_NAME, quantity: 5 }],
};

export const FACTORY: BuildingConstant = {
  buildingType: FACTORY_NAME,
  buildingCost: [
    { name: RARE_METAL_NAME, quantity: 10 },
    { name: SYNTHETICS_NAME, quantity: 10 },
    { name: OXYGEN_NAME, quantity: 5 },
  ],
  dailyProduction: [{ name: SYNTHETICS_NAME, quantity: 20 }],
  dailyCost: [{ name: OXYGEN_NAME, quantity: 5 }],
};

export const BIOME_FARM: BuildingConstant = {
  buildingType: BIOME_FARM_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 15 },
    { name: SYNTHETICS_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: MINERALS_NAME, quantity: 10 },
  ],
  dailyProduction: [
    { name: OXYGEN_NAME, quantity: 15 },
    { name: FOOD_NAME, quantity: 10 },
  ],
  dailyCost: [{ name: OXYGEN_NAME, quantity: 15 }],
};

export const TEMPLE: BuildingConstant = {
  buildingType: TEMPLE_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 10 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: WATER_NAME, quantity: 5 },
  ],
  dailyProduction: [],
  dailyCost: [
    { name: OXYGEN_NAME, quantity: 5 },
    { name: WATER_NAME, quantity: 5 },
  ],
};

export const BARRACKS: BuildingConstant = {
  buildingType: BARRACKS_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 15 },
    { name: FOOD_NAME, quantity: 10 },
    { name: WATER_NAME, quantity: 5 },
  ],
  dailyProduction: [],
  dailyCost: [
    { name: FOOD_NAME, quantity: 10 },
    { name: WATER_NAME, quantity: 5 },
  ],
};

export const THEATRE: BuildingConstant = {
  buildingType: THEATRE_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 10 },
    { name: RARE_METAL_NAME, quantity: 5 },
  ],
  dailyProduction: [],
  dailyCost: [],
};

export const SCHOOL: BuildingConstant = {
  buildingType: SCHOOL_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 10 },
    { name: WATER_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 5 },
  ],
  dailyProduction: [],
  dailyCost: [{ name: FOOD_NAME, quantity: 5 }],
};

export const UNIVERSITY: BuildingConstant = {
  buildingType: UNIVERSITY_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 20 },
    { name: WATER_NAME, quantity: 10 },
  ],
  dailyProduction: [],
  dailyCost: [{ name: WATER_NAME, quantity: 10 }],
};

export const HOSPITAL: BuildingConstant = {
  buildingType: HOSPITAL_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 20 },
    { name: OXYGEN_NAME, quantity: 20 },
    { name: WATER_NAME, quantity: 20 },
    { name: FOOD_NAME, quantity: 20 },
    { name: MINERALS_NAME, quantity: 10 },
  ],
  dailyProduction: [],
  dailyCost: [
    { name: OXYGEN_NAME, quantity: 20 },
    { name: WATER_NAME, quantity: 20 },
    { name: FOOD_NAME, quantity: 20 },
  ],
};

export const SCIENCE_LAB: BuildingConstant = {
  buildingType: SCIENCE_LAB_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 15 },
    { name: OXYGEN_NAME, quantity: 10 },
    { name: RARE_METAL_NAME, quantity: 10 },
  ],
  dailyProduction: [],
  dailyCost: [{ name: OXYGEN_NAME, quantity: 10 }],
};

export const LAUNCH_PAD: BuildingConstant = {
  buildingType: LAUNCH_PAD_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 10 },
    { name: RARE_METAL_NAME, quantity: 10 },
  ],
  dailyProduction: [],
  dailyCost: [],
};

export const SUPERCONDUCTOR: BuildingConstant = {
  buildingType: SUPERCONDUCTOR_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 100 },
    { name: RARE_METAL_NAME, quantity: 100 },
  ],
  dailyProduction: [],
  dailyCost: [],
};

export const PRESET_BUILDINGS_LIST = [
  COLONY_HUB,
  ROCK_MINE,
  ICE_MINE,
  FACTORY,
  BIOME_FARM,
  TEMPLE,
  BARRACKS,
  THEATRE,
  SCHOOL,
  UNIVERSITY,
  HOSPITAL,
  SCIENCE_LAB,
  LAUNCH_PAD,
  SUPERCONDUCTOR,
];
