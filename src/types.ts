export type MAP_COLUMNS =  "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K";
export type MAP_ROWS = 1 | 2 | 3 | 4 | 5;
export type BuildingType = "Colony Hub" | "Rock Mine" | "Ice Mine" | "Factory" | "Biome/Farm" | 
    "Temple" | "Barracks" | "Theatre" | "School" | "University" | "Hospital" | "Science Lab" | 
    "Launch Pad" | "Superconductor";

export type Faction = {
    id: number;
    name: string;
    resourcesOwned: Resource[];
    tilesOwned: Tile[];
    provides: Colonist[];
    wants: Resource[];
}

export type Resource = {
    name: string;
    quantity: number;
}

export type Tile = {
    column: MAP_COLUMNS;
    row: MAP_ROWS;
    resources: Resource[];
    colonizedBy?: Faction;
}

export type Building = {
    type: BuildingType;
    dailyProduction: Resource[];
    dailyCost: Resource[];
}

export type BuildingConstant = Building & {
    buildingCost: Resource[]
}

export type Colonist = {
    type: string;
    subtype: string;
    occupies: Building;
    factionSupply: Faction;
    cost: Resource[];
}

export type Leader = {
    type: string;
    building: Building;
}



