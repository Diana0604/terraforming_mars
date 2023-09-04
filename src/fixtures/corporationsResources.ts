import {
  FOOD_NAME,
  MINERALS_NAME,
  OXYGEN_NAME,
  RARE_METAL_NAME,
  SYNTHETICS_NAME,
  WATER_NAME,
} from "@/constants";

const corporationResourcesInformation =  {
  playerCorporationResources: [
    { name: WATER_NAME, quantity: 20 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 20 },
    { name: FOOD_NAME, quantity: 20 },
    { name: MINERALS_NAME, quantity: 10 },
    { name: SYNTHETICS_NAME, quantity: 20 },
  ],
  actorsCorporationResources: [
    { name: WATER_NAME, quantity: 100 },
    { name: RARE_METAL_NAME, quantity: 100 },
    { name: OXYGEN_NAME, quantity: 100 },
    { name: FOOD_NAME, quantity: 100 },
    { name: MINERALS_NAME, quantity: 100 },
    { name: SYNTHETICS_NAME, quantity: 100 },
  ],
};

export default corporationResourcesInformation
