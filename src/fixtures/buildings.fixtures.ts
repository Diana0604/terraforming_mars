//name variables for buildings
import { checkValidResourceList } from "../functions/helpers";
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
} from "../constants";

//types
import { BuildingConstant } from "../types";

//cost of buildings
export const COLONY_HUB: BuildingConstant = {
  buildingType: COLONY_HUB_NAME,
  buildingCost: [
    { name: "Water", quantity: 5 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 5 },
    { name: "Food", quantity: 5 },
    { name: "Synthetics", quantity: 5 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyProduction: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 10 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyCost: [
    { name: "Water", quantity: 5 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 5 },
    { name: "Food", quantity: 5 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
};

export const ROCK_MINE: BuildingConstant = {
  buildingType: ROCK_MINE_NAME,
  buildingCost: [
    { name: "Water", quantity: 5, },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 5 },
    { name: "Minerals", quantity: 10 },
  ],
  dailyProduction: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 15 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 20 },
  ],
  dailyCost: [
    { name: "Water", quantity: 5 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
};

export const ICE_MINE: BuildingConstant = {
  buildingType: ICE_MINE_NAME,
  buildingCost: [
    { name: "Water", quantity: 5 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 10 },
    { name: "Minerals", quantity: 10 },
  ],
  dailyProduction: [
    { name: "Water", quantity: 30 },
    { name: "Rare Metal", quantity: 10 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyCost: [
    { name: "Water", quantity: 5 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
};

export const FACTORY: BuildingConstant = {
  buildingType: FACTORY_NAME,
  buildingCost: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 10 },
    { name: "Oxygen", quantity: 5 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 10 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyProduction: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 20 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyCost: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 5 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
};

export const BIOME_FARM: BuildingConstant = {
  buildingType: BIOME_FARM_NAME,
  buildingCost: [
    { name: "Water", quantity: 15 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 5 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 5 },
    { name: "Minerals", quantity: 10 },
  ],
  dailyProduction: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 25 },
    { name: "Food", quantity: 20 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyCost: [
    { name: "Water", quantity: 5 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 5 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
};

export const TEMPLE: BuildingConstant = {
  buildingType: TEMPLE_NAME,
  buildingCost: [
    { name: "Water", quantity: 5 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 5 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 10 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyProduction: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyCost: [
    { name: "Water", quantity: 5 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 5 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
};

export const BARRACKS: BuildingConstant = {
  buildingType: BARRACKS_NAME,
  buildingCost: [
    { name: "Water", quantity: 5 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 10 },
    { name: "Synthetics", quantity: 15 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyProduction: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyCost: [
    { name: "Water", quantity: 5 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 5 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
};

export const THEATRE: BuildingConstant = {
  buildingType: THEATRE_NAME,
  buildingCost: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 5 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 10 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyProduction: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyCost: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
};

export const SCHOOL: BuildingConstant = {
  buildingType: SCHOOL_NAME,
  buildingCost: [
    { name: "Water", quantity: 5 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 5 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 10 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyProduction: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyCost: [
    { name: "Water", quantity: 5 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 5 },
    { name: "Food", quantity: 5 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
};

export const UNIVERSITY: BuildingConstant = {
  buildingType: UNIVERSITY_NAME,
  buildingCost: [
    { name: "Water", quantity: 10 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 20 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyProduction: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyCost: [
    { name: "Water", quantity: 5 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 5 },
    { name: "Food", quantity: 5 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
};

export const HOSPITAL: BuildingConstant = {
  buildingType: HOSPITAL_NAME,
  buildingCost: [
    { name: "Water", quantity: 20 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 20 },
    { name: "Food", quantity: 20 },
    { name: "Synthetics", quantity: 20 },
    { name: "Minerals", quantity: 10 },
  ],
  dailyProduction: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyCost: [
    { name: "Water", quantity: 10 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 10 },
    { name: "Food", quantity: 10 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
};

export const SCIENCE_LAB: BuildingConstant = {
  buildingType: SCIENCE_LAB_NAME,
  buildingCost: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 10 },
    { name: "Oxygen", quantity: 10 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 15 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyProduction: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyCost: [
    { name: "Water", quantity: 5 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 5 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
};

export const LAUNCH_PAD: BuildingConstant = {
  buildingType: LAUNCH_PAD_NAME,
  buildingCost: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 10 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 10 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyProduction: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyCost: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
};

export const SUPERCONDUCTOR: BuildingConstant = {
  buildingType: SUPERCONDUCTOR_NAME,
  buildingCost: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 100 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 100 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyProduction: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
  dailyCost: [
    { name: "Water", quantity: 0 },
    { name: "Rare Metal", quantity: 0 },
    { name: "Oxygen", quantity: 0 },
    { name: "Food", quantity: 0 },
    { name: "Synthetics", quantity: 0 },
    { name: "Minerals", quantity: 0 },
  ],
};

const PRESET_BUILDINGS_LIST = [
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

const checkResourcesImplementation = () => {
  for (const building of PRESET_BUILDINGS_LIST) {
    checkValidResourceList(building.buildingCost);
    checkValidResourceList(building.dailyCost);
    checkValidResourceList(building.dailyProduction);
  }
}

const getBuildingList = () => {
  checkResourcesImplementation();
  return PRESET_BUILDINGS_LIST;
}

export default getBuildingList;