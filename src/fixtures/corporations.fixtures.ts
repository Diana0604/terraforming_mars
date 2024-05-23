import { Corporation } from "@/types";
import RESOURCES from "./resources.fixtures";

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

    //check all corporation resources are from resources list and in correct place
    for (const index in corporation.resourcesOwned) {
      const resource = corporation.resourcesOwned[index];
      if (!resource) throw Error(`no resource at index ${index}`);

      if (resource.name != RESOURCES[index]) {
        throw Error("A company resource is not part of the resources list. Check file corporations.fixtures.ts and resources.fixtures.ts to fix.");
      }
    }

    //check all resources from list are present in corporation and in correct place
    for (const index in RESOURCES) {
      const resource = corporation.resourcesOwned[index];
      if (!resource) throw Error(`no resource at index ${index}`);

      if (resource.name != RESOURCES[index]) {
        throw Error("A resource from the list is not present in the corporation initial resources.  Check file corporations.fixtures.ts and resources.fixtures.ts to fix.");
      }
    }
  }
};

const getCorporationFixtures = () => {
  checkResourcesImplementation();
  return corporations;
}

export default getCorporationFixtures;