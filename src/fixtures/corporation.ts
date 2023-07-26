import { RESOURCES_LIST } from "@/constants";
import { Corporation } from "@/types";
import mongoose from "mongoose";

const corporationFixtures: Corporation[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Player",
    resourcesOwned: RESOURCES_LIST.map((value) => {
      return { name: value, quantity: 100 };
    }),
    buildingsOwned: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Actors",
    resourcesOwned: RESOURCES_LIST.map((value) => {
      return { name: value, quantity: 100 };
    }),
    buildingsOwned: [],
  },
];
export default corporationFixtures;
