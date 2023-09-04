import mongoose from "mongoose";

export type MAP_COLUMNS =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K";
export type MAP_ROWS = 1 | 2 | 3 | 4 | 5;
export type BuildingType = "Colony Hub" | "Rock Mine" | "Ice Mine" | "Factory" | "Biome/Farm" | 
    "Temple" | "Barracks" | "Theatre" | "School" | "University" | "Hospital" | "Science Lab" | 
    "Launch Pad" | "Superconductor" | string;
export type ResourceName = "Rare Metal" | "Water" | "Oxygen" | "Food" | "Synthetics" | "Minerals" | "Ice";

export type Coordinate = {
  x: number;
  y: number;
};

export type Round = {
  number: number;
  startTime?: Date;
  playing: boolean;
  darkHour: boolean;
};

export type Corporation = {
  _id?: mongoose.Types.ObjectId; //id in database
  name: string;
  resourcesOwned: Resource[];
  buildingsOwned: Building[];
  resourcesNextRound?: Resource[];
  newBuildingsNextRound?: Building[];
  tilesCanBuild: Tile[];
};

export type Resource = {
  name: string;
  quantity: number;
};

export type Tile = {
  _id?: mongoose.Types.ObjectId;
  column: MAP_COLUMNS;
  row: MAP_ROWS;
  resourcesAvailable: ResourceName[];
  destroyed: boolean;
  colonizedBy?: Corporation;
  buildings?: BuildingConstant[];
  hazards: string[];
  landmark?: string
};

export type Building = {
  buildingType: BuildingType;
  dailyProduction: Resource[];
  dailyCost: Resource[];
  tile: Tile;
};

export type BuildingConstant = {
  buildingType: BuildingType;
  dailyProduction: Resource[];
  dailyCost: Resource[];
  buildingCost: Resource[];
};
