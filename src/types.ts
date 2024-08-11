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
  pausedAt?: Date;
  number: number;
  startTime?: Date;
  playing: boolean;
  darkHour: boolean;
  save?: Function;
};

export type Corporation = {
  save?: Function;
  _id?: mongoose.Types.ObjectId; //id in database
  name: string;
  resourcesOwned: Resource[];
  buildingsOwned: Building[];
  resourcesNextRound?: Resource[];
  newBuildingsNextRound?: Building[];
  tilesCanBuild: Tile[];
  player: boolean;
};

export type InitCorporation = {
  name: string;
  resourcesOwned: Resource[];
  player: boolean;
}

export type Resource = {
  name: string;
  quantity: number;
  _id?: mongoose.Types.ObjectId
};

export type Tile = {
  _id?: mongoose.Types.ObjectId;
  column: MAP_COLUMNS;
  row: MAP_ROWS;
  resourcesAvailable: ResourceName[];
  destroyed: boolean;
  colonizedBy?: Corporation | mongoose.Types.ObjectId;
  buildings?: BuildingConstant[];
  hazards: string[];
  landmark?: string;
  save?: Function;
};

export type InitTile = {
  _id?: mongoose.Types.ObjectId;
  column: MAP_COLUMNS;
  row: MAP_ROWS;
  resourcesAvailable: string[];
  hazards: string[];
  landmark?: string;
}

export type Building = {
  _id?: mongoose.Types.ObjectId;
  owner?: Corporation | mongoose.Types.ObjectId;
  buildingType: BuildingType;
  dailyProduction: Resource[];
  dailyCost: Resource[];
  tile: Tile | mongoose.Types.ObjectId;
};

export type BuildingConstant = {
  buildingType: BuildingType;
  dailyProduction: Resource[];
  dailyCost: Resource[];
  buildingCost: Resource[];
};
