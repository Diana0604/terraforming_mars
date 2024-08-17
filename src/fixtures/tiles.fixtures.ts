import { Tile } from "../types";

import RESOURCES from "./resources.fixtures";

const tiles: Tile[] = [
  {
    column: "A",
    row: 1,
    resourcesAvailable: [],
    destroyed: false,
    hazards: ["Desert", "strong winds"],
    landmark: "Olympus Mons"
  },
  {
    column: "B",
    row: 1,
    resourcesAvailable: ["Rare Metal", "Minerals"],
    destroyed: false,
    hazards: ["Dormant volcano"],
  },
  {
    column: "B",
    row: 2,
    resourcesAvailable: [],
    destroyed: false,
    hazards: ["Dormant volcano"],
  },
  {
    column: "C",
    row: 1,
    resourcesAvailable: [],
    hazards: ["Dormant volcano", "desert", "strong winds"],
    destroyed: false,
  },
  {
    column: "C",
    row: 2,
    resourcesAvailable: ["Minerals"],
    hazards: ["Dormant volcanos", "canyon network"],
    destroyed: false,
  },
  {
    column: "C",
    row: 3,
    resourcesAvailable: ["Minerals"],
    hazards: ["Potential flood basin", "no wind guard"],
    destroyed: false,
  },
  {
    column: "D",
    row: 1,
    resourcesAvailable: [],
    hazards: ["desert", "strong winds"],
    destroyed: false,
  },
  {
    column: "D",
    row: 2,
    resourcesAvailable: [],
    hazards: ["desert", "craters"],
    destroyed: false,
  },
  {
    column: "D",
    row: 3,
    resourcesAvailable: ["Water"],
    hazards: ["potential flood basin", "canyon network"],
    destroyed: false,
  },
  {
    column: "D",
    row: 4,
    resourcesAvailable: ["Ice", "Minerals"],
    hazards: ["Potential flood basin", "no wind guard"],
    destroyed: false,
  },
  {
    column: "E",
    row: 1,
    resourcesAvailable: ["Ice", "Rare Metal"],
    hazards: ["Frozen carbon"],
    destroyed: false,
  },
  {
    column: "E",
    row: 2,
    resourcesAvailable: ["Minerals"],
    hazards: ["Strong winds"],
    destroyed: false,
  },
  {
    column: "E",
    row: 3,
    resourcesAvailable: ["Rare Metal"],
    hazards: ["Canyon network", "potential flood basin"],
    destroyed: false,
  },
  {
    column: "E",
    row: 4,
    resourcesAvailable: ["Minerals", "Water"],
    hazards: ["Potential flood basin", "no wind guard"],
    destroyed: false,
  },
  {
    column: "E",
    row: 5,
    resourcesAvailable: ["Ice", "Rare Metal"],
    hazards: ["potential flood basin"],
    destroyed: false,
  },
  {
    column: "F",
    row: 1,
    resourcesAvailable: ["Water"],
    hazards: ["Underground tunnels"],
    destroyed: false,
  },
  {
    column: "F",
    row: 2,
    resourcesAvailable: [],
    hazards: ["Plateau", "strong winds", "underground tunnels"],
    destroyed: false,
  },
  {
    column: "F",
    row: 3,
    resourcesAvailable: ["Minerals"],
    hazards: ["potential flood basin", "underground tunnels"],
    destroyed: false,
  },
  {
    column: "F",
    row: 4,
    resourcesAvailable: ["Ice", "Minerals"],
    hazards: ["Potential flood basin", "no wind guard"],
    destroyed: false,
  },
  {
    column: "G",
    row: 1,
    resourcesAvailable: ["Ice", "Rare Metal"],
    hazards: ["Frozen carbon"],
    destroyed: false,
  },
  {
    column: "G",
    row: 2,
    resourcesAvailable: [],
    hazards: ["Plateau", "strong winds"],
    destroyed: false,
  },
  {
    column: "G",
    row: 3,
    resourcesAvailable: [],
    hazards: ["Cliffs", "strong winds", "potential flood basin"],
    destroyed: false,
  },
  {
    column: "G",
    row: 4,
    resourcesAvailable: [],
    hazards: ["Potential flood basin", "no wind guard"],
    destroyed: false,
  },
  {
    column: "G",
    row: 5,
    resourcesAvailable: ["Ice", "Rare Metal"],
    hazards: ["potential flood basin"],
    destroyed: false,
  },
  {
    column: "H",
    row: 1,
    resourcesAvailable: ["Minerals"],
    hazards: ["soft ground", "underground tunnels"],
    destroyed: false,
  },
  {
    column: "H",
    row: 2,
    resourcesAvailable: [],
    hazards: ["Cliffs", "strong winds", "potential flood basin"],
    destroyed: false,
  },
  {
    column: "H",
    row: 3,
    resourcesAvailable: [],
    hazards: ["Potential flood basin"],
    destroyed: false,
  },
  {
    column: "H",
    row: 4,
    resourcesAvailable: ["Ice", "Minerals", "Rare Metal", "Water"],
    hazards: ["Potential flood basin"],
    destroyed: false,
  },
  {
    column: "I",
    row: 1,
    resourcesAvailable: [],
    hazards: ["Desert", "strong winds"],
    destroyed: false,
  },
  {
    column: "I",
    row: 2,
    resourcesAvailable: ["Water"],
    hazards: ["Cliffs", "strong winds", "potential flood basin"],
    destroyed: false,
  },
  {
    column: "I",
    row: 3,
    resourcesAvailable: [],
    hazards: ["Potential flood basin"],
    destroyed: false,
  },
  {
    column: "J",
    row: 1,
    resourcesAvailable: ["Minerals"],
    hazards: ["Dormant volcano", "strong winds"],
    destroyed: false,
  },
  {
    column: "J",
    row: 2,
    resourcesAvailable: [],
    hazards: ["Cliffs", "strong winds", "potential flood basin"],
    destroyed: false,
    landmark: "Elysium Mons"
  },
  {
    column: "K",
    row: 1,
    resourcesAvailable: [],
    hazards: ["Desert", "strong winds"],
    destroyed: false,
  },
];

const checkResourcesImplementation = () => {
  for (const tile of tiles) {
    for (const resource of tile.resourcesAvailable) {
      if(resource == "Ice") continue; //Ice is special as it means water
      if (!(RESOURCES.includes(resource))) {
        console.log(`The resource ${resource} is not a valid resource in tile ${tile.column}, ${tile.row}`)
        throw Error(`The resource ${resource} is not a valid resource`);
      }
    }
  }
}

const getFixtureTiles = () => {
  checkResourcesImplementation();
  return tiles;
}

export default getFixtureTiles;
