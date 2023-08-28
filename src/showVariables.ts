import { BARRACKS_NAME, BIOME_FARM_NAME, COLONY_HUB_NAME, FACTORY_NAME, FOOD_NAME, HOSPITAL_NAME, ICE_MINE_NAME, LAUNCH_PAD_NAME, MINERALS_NAME, OXYGEN_NAME, RARE_METAL_NAME, ROCK_MINE_NAME, SCHOOL_NAME, SCIENCE_LAB_NAME, SUPERCONDUCTOR_NAME, SYNTHETICS_NAME, TEMPLE_NAME, THEATRE_NAME, UNIVERSITY_NAME, WATER_NAME } from "./constants";
import { BuildingConstant } from "./types";

//names of corporations
export const PLAYER_CORPORATION_NAME = "Player";
export const ACTORS_CORPORATION_NAME = "Actors";

//round management
export const SECONDS_PER_ROUND = 10*60; //10 mins

//cost of buildings
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