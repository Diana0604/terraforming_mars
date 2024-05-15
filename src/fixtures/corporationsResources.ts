import {
  RESOURCES_LIST,
} from "../constants";

const corporationResourcesInformation = {
  playerCorporationResources: RESOURCES_LIST.map((resource) => {
    return { ...resource, quantity: 100 }
  }),
  actorsCorporationResources: RESOURCES_LIST.map((resource) => {
    return { ...resource, quantity: 100 }
  }),
};

export default corporationResourcesInformation
