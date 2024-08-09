"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Corporation } from "@/types";
import { INIT_CORPORATION_ROUTE } from "@/constants";
import { fetchGet } from "@/functions/database/database.fetchers";

interface initialStatsProps {
  corporations: Corporation[];
}

const initProps = {
  corporations: [],
};

export const InitialStatsContext = createContext<initialStatsProps>(initProps);

const InitialStatsContextProvider = ({ children }: { children: ReactNode }) => {
  const [corporations, setCorporations] = useState<Corporation[]>([]);

  //fetch corporation callback
  const fetchCorporationCallback = (data: { corporations: Corporation[] }) =>
    setCorporations(data.corporations);

  //get params for init corporations
  useEffect(
    () => fetchGet(INIT_CORPORATION_ROUTE, fetchCorporationCallback),
    []
  );

  return (
    <InitialStatsContext.Provider value={{ corporations }}>
      {children}
    </InitialStatsContext.Provider>
  );
};

export default InitialStatsContextProvider;
