import { INIT_RESOURCE_ROUTE } from "@/constants";
import { fetchGet, fetchPost } from "@/functions/database/database.fetchers";
import { createContext, ReactNode, useEffect, useState } from "react";

interface InitialResourcesProps {
  resources: string[];
  addNewResource: (name: string) => void;
}

const initProps: InitialResourcesProps = {
  resources: [],
  addNewResource: () => {},
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

  const fetchGetCallback = (data: { name: string }[]) => {
    const newResources = data.map((value) => value.name);
    setResources(newResources);
  };

  const fetchInitResources = () =>
    fetchGet(INIT_RESOURCE_ROUTE, fetchGetCallback);

  //get resources from db
  useEffect(() => fetchInitResources, []);

  //add new resource function
  const addNewResource = async (name: string) => {
    fetchPost(INIT_RESOURCE_ROUTE, { name }, fetchInitResources);
  };

  //return provider
  return (
    <InitialResourcesContext.Provider value={{ resources, addNewResource }}>
      {children}
    </InitialResourcesContext.Provider>
  );
};

export default InitialResourcesContextProvider;
