import { INIT_RESOURCE_ROUTE } from "@/constants";
import {
  fetchDelete,
  fetchGet,
  fetchPost,
} from "@/functions/database/database.fetchers";
import { createContext, ReactNode, useEffect, useState } from "react";

interface InitialResourcesProps {
  resources: string[];
  addNewResource: (name: string) => void;
  deleteResource: (name: string) => void;
}

const initProps: InitialResourcesProps = {
  resources: [],
  addNewResource: () => {},
  deleteResource: () => {},
};

export const InitialResourcesContext =
  createContext<InitialResourcesProps>(initProps);

const InitialResourcesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  //props and setters
  const [resources, setResources] = useState<string[]>([]);

  useEffect(() => {
    console.log('from context', resources);
  }, [resources])

  const fetchGetCallback = (data: { name: string }[]) => {
    const newResources = data.map((value) => value.name);
    setResources(newResources);
  };

  const fetchInitResources = () =>{
    console.log('fetching init resources');
    fetchGet(INIT_RESOURCE_ROUTE, fetchGetCallback);
  }

  //get resources from db
  useEffect(() => fetchInitResources, []);

  //add new resource function
  const addNewResource = async (name: string) =>
    fetchPost(INIT_RESOURCE_ROUTE, { name }, fetchInitResources);

  //delete resource
  const deleteResource = async (name: string) =>
    fetchDelete(INIT_RESOURCE_ROUTE, { name }, fetchInitResources);

  //return provider
  return (
    <InitialResourcesContext.Provider
      value={{ resources, addNewResource, deleteResource }}
    >
      {children}
    </InitialResourcesContext.Provider>
  );
};

export default InitialResourcesContextProvider;
