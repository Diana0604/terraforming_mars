//name variables for materials
import {
  FOOD_NAME,
  MINERALS_NAME,
  OXYGEN_NAME,
  RARE_METAL_NAME,
  SYNTHETICS_NAME,
  WATER_NAME,
} from "./constants";

//name variables for buildings
import {
  BARRACKS_NAME,
  BIOME_FARM_NAME,
  COLONY_HUB_NAME,
  FACTORY_NAME,
  HOSPITAL_NAME,
  ICE_MINE_NAME,
  LAUNCH_PAD_NAME,
  ROCK_MINE_NAME,
  SCHOOL_NAME,
  SCIENCE_LAB_NAME,
  TEMPLE_NAME,
  THEATRE_NAME,
  UNIVERSITY_NAME,
  SUPERCONDUCTOR_NAME,
} from "./constants";

//types
import { BuildingConstant } from "./types";

//names of corporations
export const PLAYER_CORPORATION_NAME = "Player";
export const ACTORS_CORPORATION_NAME = "Actors";

//round management
export const SECONDS_PER_ROUND = 10 * 60;

//cost of buildings
export const COLONY_HUB: BuildingConstant = {
  buildingType: COLONY_HUB_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 5 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 5 },
  ],
  dailyProduction: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 10 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
  dailyCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 5 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
};

export const ROCK_MINE: BuildingConstant = {
  buildingType: ROCK_MINE_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 10 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 5 },
  ],
  dailyProduction: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 20 },
    { name: RARE_METAL_NAME, quantity: 15 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
  dailyCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
};

export const ICE_MINE: BuildingConstant = {
  buildingType: ICE_MINE_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 10 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 10 },
  ],
  dailyProduction: [
    { name: WATER_NAME, quantity: 20 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 10 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
  dailyCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
};

export const FACTORY: BuildingConstant = {
  buildingType: FACTORY_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 10 },
    { name: SYNTHETICS_NAME, quantity: 10 },
  ],
  dailyProduction: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 20 },
  ],
  dailyCost: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
};

export const BIOME_FARM: BuildingConstant = {
  buildingType: BIOME_FARM_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 15 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 10 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 5 },
  ],
  dailyProduction: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 15 },
    { name: FOOD_NAME, quantity: 10 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
  dailyCost: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 15 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
};

export const TEMPLE: BuildingConstant = {
  buildingType: TEMPLE_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 10 },
  ],
  dailyProduction: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
  dailyCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
};

export const BARRACKS: BuildingConstant = {
  buildingType: BARRACKS_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 10 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 15 },
  ],
  dailyProduction: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
  dailyCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 10 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
};

export const THEATRE: BuildingConstant = {
  buildingType: THEATRE_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 5 },
    { name: SYNTHETICS_NAME, quantity: 10 },
  ],
  dailyProduction: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
  dailyCost: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
};

export const SCHOOL: BuildingConstant = {
  buildingType: SCHOOL_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 10 },
  ],
  dailyProduction: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
  dailyCost: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 5 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
};

export const UNIVERSITY: BuildingConstant = {
  buildingType: UNIVERSITY_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 10 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 20 },
  ],
  dailyProduction: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
  dailyCost: [
    { name: WATER_NAME, quantity: 10 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
};

export const HOSPITAL: BuildingConstant = {
  buildingType: HOSPITAL_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 20 },
    { name: OXYGEN_NAME, quantity: 20 },
    { name: FOOD_NAME, quantity: 20 },
    { name: MINERALS_NAME, quantity: 10 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 20 },
  ],
  dailyProduction: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
  dailyCost: [
    { name: WATER_NAME, quantity: 20 },
    { name: OXYGEN_NAME, quantity: 20 },
    { name: FOOD_NAME, quantity: 20 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
};

export const SCIENCE_LAB: BuildingConstant = {
  buildingType: SCIENCE_LAB_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 10 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 10 },
    { name: SYNTHETICS_NAME, quantity: 15 },
  ],
  dailyProduction: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
  dailyCost: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 10 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
};

export const LAUNCH_PAD: BuildingConstant = {
  buildingType: LAUNCH_PAD_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 10 },
    { name: SYNTHETICS_NAME, quantity: 10 },
  ],
  dailyProduction: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
  dailyCost: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
};

export const SUPERCONDUCTOR: BuildingConstant = {
  buildingType: SUPERCONDUCTOR_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 100 },
    { name: SYNTHETICS_NAME, quantity: 100 },
  ],
  dailyProduction: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
  dailyCost: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 0 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
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
