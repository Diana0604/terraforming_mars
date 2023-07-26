export type MAP_COLUMNS =  "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K";
export type MAP_ROWS = 1 | 2 | 3 | 4 | 5;
export type BuildingType = "Colony Hub" | "Rock Mine" | "Ice Mine" | "Factory" | "Biome/Farm" | 
    "Temple" | "Barracks" | "Theatre" | "School" | "University" | "Hospital" | "Science Lab" | 
    "Launch Pad" | "Superconductor";
export type ResourceName = "Rare Metal" | "Water" | "Oxygen" | "Food" | "Synthetics" | "Minerals";

export type Coordinate = {
    x: number;
    y: number;
}

export type Corporation = {
    _id?: string; //id in database
    id: number; //do we need id?
    name: string;
    resourcesOwned: Resource[];
    buildingsOwned: Building[]
}

export type Resource = {
    name: string;
    quantity: number;
}

export type Tile = {
    column: MAP_COLUMNS;
    row: MAP_ROWS;
    resourcesAvailable: ResourceName[];
    colonizedBy?: Corporation;
}

export type Building = {
    buildingType: BuildingType;
    dailyProduction: Resource[];
    dailyCost: Resource[];
    tile: Tile;
}

export type BuildingConstant = {
    buildingType: BuildingType;
    dailyProduction: Resource[];
    dailyCost: Resource[];
    buildingCost: Resource[]
}

