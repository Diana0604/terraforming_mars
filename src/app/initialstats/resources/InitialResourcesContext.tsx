import { INIT_RESOURCE_ROUTE } from "@/constants";
import { createContext, ReactNode, useEffect, useState } from "react";

interface InitialResourcesProps {
  resources: string[];
}

const initProps: InitialResourcesProps = {
  resources: [],
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

  //get resources from db
  useEffect(() => {
    fetch(INIT_RESOURCE_ROUTE, { method: "get" }).then(async (response) => {
      const data : {name: string}[] = await response.json();
      const newResources = data.map((value) => value.name);
      setResources(newResources);
    });
  }, []);

  //return provider
  return (
    <InitialResourcesContext.Provider value={{ resources }}>
      {children}
    </InitialResourcesContext.Provider>
  );
};

export default InitialResourcesContextProvider;
