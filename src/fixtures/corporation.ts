import { RESOURCES_LIST } from "@/constants";
import { Corporation } from "@/types";

const corporationFixtures: Corporation[] = [
  {
    _id: '0',
    name: "Player",
    resourcesOwned: RESOURCES_LIST.map((value) => {
      return { name: value, quantity: 100 };
    }),
    //tilesOwned: [],
    buildingsOwned: [],
  },
  {
    _id: '1',
    name: "Actors",
    resourcesOwned: RESOURCES_LIST.map((value) => {
      return { name: value, quantity: 100 };
    }),
    //tilesOwned: [],
    buildingsOwned: [],
  },
];
export default corporationFixtures;
