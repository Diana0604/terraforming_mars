import { Resource } from "@/types";
import RESOURCES from "./resources.fixtures";


export const checkValidResourceList = (resourceList: Resource[]) => {
  //check all corporation resources are from resources list and in correct place
  for (const index in resourceList) {
    const resource = resourceList[index];
    if (!resource) throw Error(`no resource at index ${index}`);

    if (resource.name != RESOURCES[index]) {
      console.log('resource error', resource.name);
      throw Error("A resource from a list is not part of the resources list. Check corresponding fixtures.ts and resources.fixtures.ts to fix.");
    }
  }

  //check all resources from list are present in corporation and in correct place
  for (const index in RESOURCES) {
    const resource = resourceList[index];
    if (!resource) throw Error(`no resource at index ${index}`);

    if (resource.name != RESOURCES[index]) {
      console.log('resource error', resource.name);
      throw Error("A resource from the list is not present in the resources list.  Check corresponding fixtures.ts and resources.fixtures.ts to fix.");
    }
  }
}