import {
  ACTORS_CORPORATION_NAME,
  PLAYER_CORPORATION_NAME,
} from "@/showVariables";
import { Corporation } from "@/types";
import mongoose from "mongoose";
import initResources from "./corporationsResources";

const corporationFixtures: Corporation[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: PLAYER_CORPORATION_NAME,
    resourcesOwned: initResources.playerCorporationResources,
    buildingsOwned: [],
    tilesCanBuild: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: ACTORS_CORPORATION_NAME,
    resourcesOwned: initResources.actorsCorporationResources,
    buildingsOwned: [],
    tilesCanBuild: [],
  },
];
export default corporationFixtures;
