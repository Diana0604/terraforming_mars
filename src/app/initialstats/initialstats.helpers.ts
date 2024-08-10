import { Resource } from "@/types";
import { Dispatch, SetStateAction } from "react";

/**
 * Cross examine the list of resource names and current list of resources and update to match resource list
 * @param resources
 * @param initialList
 * @param setter
 */
export const updateFromResources = (
  resources: string[],
  initialList: Resource[],
  setter: Dispatch<SetStateAction<Resource[]>>
) => {
  //make a copy of current resources list
  const newList: Resource[] = JSON.parse(JSON.stringify(initialList));

  //loop through all resources
  for (const resource of resources) {
    //check if resource is already in corp resources
    const resourceIndex = initialList.map((v) => v.name).indexOf(resource);

    if (resourceIndex === -1) newList.push({ name: resource, quantity: 0 });
  }

  //remove any resources in initialsList that may have been deleted
  let i = 0;
  while (newList[i]) {
    const corpResource = newList[i];

    const resourceIndex = resources.indexOf(corpResource.name);

    //if resource cannot be found in resources list, delete it
    if (resourceIndex === -1) newList.splice(i, 1);
    else i++;
  }

  //update corporation resources
  setter(newList);
};