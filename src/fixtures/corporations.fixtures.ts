import { Corporation } from "@/types";
import RESOURCES from "./resources.fixtures";
import { checkValidResourceList } from "../functions/helpers";

const corporations: Corporation[] = [
  {
    name: "Persephone",
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
    name: "Atlas Corp.",
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