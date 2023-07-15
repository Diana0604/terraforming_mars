import { BuildingConstant, Resource } from "./types";

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

//api variables
export const DATABASE_ROUTE = "/api/database";

//============================= GAME CONSTANTS ==========================

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
  type: COLONY_HUB_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 3 },
    { name: SYNTHETICS_NAME, quantity: 5 },
  ],
  dailyProduction: [],
  dailyCost: [],
};

export const ROCK_MINE: BuildingConstant = {
  type: ROCK_MINE_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: MINERALS_NAME, quantity: 10 },
    { name: SYNTHETICS_NAME, quantity: 5 },
  ],
  dailyProduction: [],
  dailyCost: [],
};

export const ICE_MINE: BuildingConstant = {
  type: ICE_MINE_NAME,
  buildingCost: [
    { name: MINERALS_NAME, quantity: 10 },
    { name: SYNTHETICS_NAME, quantity: 10 },
    { name: WATER_NAME, quantity: 5 },
  ],
  dailyProduction: [],
  dailyCost: [],
};

export const FACTORY: BuildingConstant = {
  type: FACTORY_NAME,
  buildingCost: [
    { name: RARE_METAL_NAME, quantity: 10 },
    { name: SYNTHETICS_NAME, quantity: 10 },
    { name: OXYGEN_NAME, quantity: 5 },
  ],
  dailyProduction: [],
  dailyCost: [],
};

export const BIOME_FARM: BuildingConstant = {
  type: BIOME_FARM_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 15 },
    { name: SYNTHETICS_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: MINERALS_NAME, quantity: 10 },
  ],
  dailyProduction: [],
  dailyCost: [],
};

export const TEMPLE: BuildingConstant = {
  type: TEMPLE_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 10 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: WATER_NAME, quantity: 5 },
  ],
  dailyProduction: [],
  dailyCost: [],
};

export const BARRACKS: BuildingConstant = {
  type: BARRACKS_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 15 },
    { name: FOOD_NAME, quantity: 10 },
    { name: WATER_NAME, quantity: 5 },
  ],
  dailyProduction: [],
  dailyCost: [],
};

export const THEATRE: BuildingConstant = {
  type: THEATRE_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 10 },
    { name: RARE_METAL_NAME, quantity: 5 },
  ],
  dailyProduction: [],
  dailyCost: [],
};

export const SCHOOL: BuildingConstant = {
  type: SCHOOL_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 10 },
    { name: WATER_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 5 },
  ],
  dailyProduction: [],
  dailyCost: [],
};

export const UNIVERSITY: BuildingConstant = {
  type: UNIVERSITY_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 20 },
    { name: WATER_NAME, quantity: 10 },
  ],
  dailyProduction: [],
  dailyCost: [],
};

export const HOSPITAL: BuildingConstant = {
  type: HOSPITAL_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 20 },
    { name: OXYGEN_NAME, quantity: 20 },
    { name: WATER_NAME, quantity: 20 },
    { name: FOOD_NAME, quantity: 20 },
    { name: MINERALS_NAME, quantity: 10 },
  ],
  dailyProduction: [],
  dailyCost: [],
};

export const SCIENCE_LAB: BuildingConstant = {
  type: SCIENCE_LAB_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 15 },
    { name: OXYGEN_NAME, quantity: 10 },
    { name: RARE_METAL_NAME, quantity: 10 },
  ],
  dailyProduction: [],
  dailyCost: [],
};

export const LAUNCH_PAD: BuildingConstant = {
  type: LAUNCH_PAD_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 10 },
    { name: RARE_METAL_NAME, quantity: 10 },
  ],
  dailyProduction: [],
  dailyCost: [],
};

export const SUPERCONDUCTOR: BuildingConstant = {
  type: SUPERCONDUCTOR_NAME,
  buildingCost: [
    { name: SYNTHETICS_NAME, quantity: 100 },
    { name: RARE_METAL_NAME, quantity: 100 },
  ],
  dailyProduction: [],
  dailyCost: [],
};
