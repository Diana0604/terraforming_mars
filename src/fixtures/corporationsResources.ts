import {
  FOOD_NAME,
  MINERALS_NAME,
  OXYGEN_NAME,
  RARE_METAL_NAME,
  RESOURCES_LIST,
  SYNTHETICS_NAME,
  WATER_NAME,
} from "@/constants";

const corporationResourcesInformation = {
  playerCorporationResources: RESOURCES_LIST.map((resource) => {
    return { ...resource, quantity: 100 }
  }),
  actorsCorporationResources: RESOURCES_LIST.map((resource) => {
    return { ...resource, quantity: 100 }
  }),
};

export default corporationResourcesInformation
