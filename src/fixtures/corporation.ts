import { RESOURCES_LIST } from "@/constants";
import { Corporation } from "@/types";

const corporationFixtures: Corporation[] = [
  {
    id: 0,
    name: "Player",
    resourcesOwned: RESOURCES_LIST.map((value) => {
      return { name: value, quantity: 100 };
    }),
    //tilesOwned: [],
    buildingsOwned: [],
  },
  {
    id: 1,
    name: "Actors",
    resourcesOwned: [],
    //tilesOwned: [],
    buildingsOwned: [],
  },
];
export default corporationFixtures;
