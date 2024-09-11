import { CORPORATION_ROUTE } from "@/constants";
import { fetchGet } from "@/functions/database/database.fetchers";
import { Corporation } from "@/types";
import { createContext, ReactNode, useState } from "react";
import { useInterval } from "usehooks-ts";

const initProps: Corporation = {
  name: "loading",
  resourcesOwned: [],
  buildingsOwned: [],
  tilesCanBuild: [],
  player: true,
};

export const IndividualCorporationContext =
  createContext<Corporation>(initProps);

const IndividualCorporationContextProvider = ({
  children,
  name,
}: {
  children: ReactNode;
  name: string;
}) => {
  const [corporation, setCorporation] = useState<Corporation>(initProps);

  const getCallback = (data: Corporation) => setCorporation(data);

  const handleInterval = () => {
    if (name && name != "loading")
      fetchGet(
        `${CORPORATION_ROUTE}?${new URLSearchParams({ name }).toString()}`,
        getCallback
      );
  };

  useInterval(handleInterval, 1000);

  return (
    <IndividualCorporationContext.Provider value={corporation}>
      {children}
    </IndividualCorporationContext.Provider>
  );
};

export default IndividualCorporationContextProvider;
