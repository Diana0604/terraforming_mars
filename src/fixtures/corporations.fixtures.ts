import { Corporation } from "@/types";
import { checkValidResourceList } from "./fixtures.functions";

//names of corporations
export const PLAYER1_CORPORATION_NAME = "Persephone";
export const PLAYER2_CORPORATION_NAME = "Atlas Corp.";

const corporations: Corporation[] = [
  {
    name: PLAYER1_CORPORATION_NAME,
    resourcesOwned: [
      { name: "Water", quantity: 100 },
      { name: "Rare Metal", quantity: 100 },
      { name: "Oxygen", quantity: 100 },
      { name: "Food", quantity: 100 },
      { name: "Synthetics", quantity: 100 },
      { name: "Minerals", quantity: 100 }
    ],
    buildingsOwned: [],
    tilesCanBuild: [],
    player: true
  },
  {
    name: PLAYER2_CORPORATION_NAME,
    resourcesOwned: [
      { name: "Water", quantity: 100 },
      { name: "Rare Metal", quantity: 100 },
      { name: "Oxygen", quantity: 100 },
      { name: "Food", quantity: 100 },
      { name: "Synthetics", quantity: 100 },
      { name: "Minerals", quantity: 100 },
    ],
    buildingsOwned: [],
    tilesCanBuild: [],
    player: false
  },
];

const checkResourcesImplementation = () => {
  for (const corporation of corporations) {

    checkValidResourceList(corporation.resourcesOwned);
  }
};

const getCorporationFixtures = () => {
  checkResourcesImplementation();
  return corporations;
}

export default getCorporationFixtures;