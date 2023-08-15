import { ACTORS_CORPORATION_NAME, PLAYER_CORPORATION_NAME, RESOURCES_LIST } from "@/constants";
import { Corporation } from "@/types";
import mongoose from "mongoose";

const corporationFixtures: Corporation[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: PLAYER_CORPORATION_NAME,
    resourcesOwned: RESOURCES_LIST.map((value) => {
      return { name: value, quantity: 100 };
    }),
    buildingsOwned: [],
    tilesCanBuild: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: ACTORS_CORPORATION_NAME,
    resourcesOwned: RESOURCES_LIST.map((value) => {
      return { name: value, quantity: 100 };
    }),
    buildingsOwned: [],
    tilesCanBuild: []
  },
];
export default corporationFixtures;
