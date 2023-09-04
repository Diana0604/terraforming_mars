import { MINERALS_NAME, RARE_METAL_NAME, WATER_NAME } from "@/constants";
import { Tile } from "@/types";

const tiles: Tile[] = [
  {
    column: "A",
    row: 1,
    resourcesAvailable: [],
    destroyed: false,
    hazards: ["Desert, strong winds"],
    landmark: "Olympus Mons"
  },
  {
    column: "B",
    row: 1,
    resourcesAvailable: [RARE_METAL_NAME, MINERALS_NAME],
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
    hazards: ["Dormant volcano, desert, strong winds"],
    destroyed: false,
  },
  {
    column: "C",
    row: 2,
    resourcesAvailable: [MINERALS_NAME],
    hazards: ["Dormant volcanos, canyon network"],
    destroyed: false,
  },
  {
    column: "C",
    row: 3,
    resourcesAvailable: [MINERALS_NAME],
    hazards: ["Potential flood basin, no wind guard"],
    destroyed: false,
  },
  {
    column: "D",
    row: 1,
    resourcesAvailable: [],
    hazards: ["desert, strong winds"],
    destroyed: false,
  },
  {
    column: "D",
    row: 2,
    resourcesAvailable: [],
    hazards: ["desert, craters"],
    destroyed: false,
  },
  {
    column: "D",
    row: 3,
    resourcesAvailable: [WATER_NAME],
    hazards: ["potential flood basin, canyon network"],
    destroyed: false,
  },
  {
    column: "D",
    row: 4,
    resourcesAvailable: ["Ice", MINERALS_NAME],
    hazards: ["Potential flood basin, no wind guard"],
    destroyed: false,
  },
  {
    column: "E",
    row: 1,
    resourcesAvailable: ["Ice", RARE_METAL_NAME],
    hazards: ["Frozen carbon"],
    destroyed: false,
  },
  {
    column: "E",
    row: 2,
    resourcesAvailable: [MINERALS_NAME],
    hazards: ["Strong winds"],
    destroyed: false,
  },
  {
    column: "E",
    row: 3,
    resourcesAvailable: [RARE_METAL_NAME],
    hazards: ["Canyon network, potential flood basin"],
    destroyed: false,
  },
  {
    column: "E",
    row: 4,
    resourcesAvailable: [MINERALS_NAME, WATER_NAME],
    hazards: ["Potential flood basin, no wind guard"],
    destroyed: false,
  },
  {
    column: "E",
    row: 5,
    resourcesAvailable: ["Ice", RARE_METAL_NAME],
    hazards: ["potential flood basin"],
    destroyed: false,
  },
  {
    column: "F",
    row: 1,
    resourcesAvailable: [WATER_NAME],
    hazards: ["Underground tunnels"],
    destroyed: false,
  },
  {
    column: "F",
    row: 2,
    resourcesAvailable: [],
    hazards: ["Plateau, strong winds, underground tunnels"],
    destroyed: false,
  },
  {
    column: "F",
    row: 3,
    resourcesAvailable: [MINERALS_NAME],
    hazards: ["potential flood basin, underground tunnels"],
    destroyed: false,
  },
  {
    column: "F",
    row: 4,
    resourcesAvailable: ["Ice", MINERALS_NAME],
    hazards: ["Potential flood basin, no wind guard"],
    destroyed: false,
  },
  {
    column: "G",
    row: 1,
    resourcesAvailable: ["Ice", RARE_METAL_NAME],
    hazards: ["Frozen carbon"],
    destroyed: false,
  },
  {
    column: "G",
    row: 2,
    resourcesAvailable: [],
    hazards: ["Plateau, strong winds"],
    destroyed: false,
  },
  {
    column: "G",
    row: 3,
    resourcesAvailable: [],
    hazards: ["Cliffs, strong winds, potential flood basin"],
    destroyed: false,
  },
  {
    column: "G",
    row: 4,
    resourcesAvailable: [],
    hazards: ["Potential flood basin, no wind guard"],
    destroyed: false,
  },
  {
    column: "G",
    row: 5,
    resourcesAvailable: ["Ice", RARE_METAL_NAME],
    hazards: ["potential flood basin"],
    destroyed: false,
  },
  {
    column: "H",
    row: 1,
    resourcesAvailable: [MINERALS_NAME],
    hazards: ["soft ground, underground tunnels"],
    destroyed: false,
  },
  {
    column: "H",
    row: 2,
    resourcesAvailable: [],
    hazards: ["Cliffs, strong winds, potential flood basin"],
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
    resourcesAvailable: ["Ice", MINERALS_NAME, RARE_METAL_NAME, WATER_NAME],
    hazards: ["Potential flood basin"],
    destroyed: false,
  },
  {
    column: "I",
    row: 1,
    resourcesAvailable: [],
    hazards: ["Desert, strong winds"],
    destroyed: false,
  },
  {
    column: "I",
    row: 2,
    resourcesAvailable: [WATER_NAME],
    hazards: ["Cliffs, strong winds, potential flood basin"],
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
    resourcesAvailable: [MINERALS_NAME],
    hazards: ["Dormant volcano, strong winds"],
    destroyed: false,
  },
  {
    column: "J",
    row: 2,
    resourcesAvailable: [],
    hazards: ["Cliffs, strong winds, potential flood basin"],
    destroyed: false,
    landmark: "Elysium Mons"
  },
  {
    column: "K",
    row: 1,
    resourcesAvailable: [],
    hazards: ["Desert, strong winds"],
    destroyed: false,
  },
];

export default tiles;
