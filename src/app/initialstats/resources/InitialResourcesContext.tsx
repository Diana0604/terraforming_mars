import { INIT_RESOURCE_ROUTE } from "@/constants";
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

  const fetchInitResources = () => {
    fetch(INIT_RESOURCE_ROUTE, { method: "get" }).then(async (response) => {
      const data: { name: string }[] = await response.json();
      const newResources = data.map((value) => value.name);
      setResources(newResources);
    });
  };

  //get resources from db
  useEffect(() => fetchInitResources, []);

  //add new resource function
  const addNewResource = async (name: string) => {
    const res = await fetch(INIT_RESOURCE_ROUTE, {
      method: "post",
      body: JSON.stringify({ name }),
    });
    fetchInitResources();
  };

  //return provider
  return (
    <InitialResourcesContext.Provider value={{ resources, addNewResource }}>
      {children}
    </InitialResourcesContext.Provider>
  );
};

export default InitialResourcesContextProvider;
