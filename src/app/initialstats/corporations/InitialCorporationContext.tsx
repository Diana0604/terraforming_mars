"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Corporation } from "@/types";
import { INIT_CORPORATION_ROUTE } from "@/constants";
import {
  fetchDelete,
  fetchGet,
  fetchPost,
} from "@/functions/database/database.fetchers";

interface initialStatsProps {
  corporations: Corporation[];
  addCorporation: (name: string) => void;
  deleteCorporation: (name: string) => void;
}

const initProps = {
  corporations: [],
  addCorporation: () => {},
  deleteCorporation: () => {},
};

export const InitialCorporationContext = createContext<initialStatsProps>(initProps);

const InitialStatsContextProvider = ({ children }: { children: ReactNode }) => {
  const [corporations, setCorporations] = useState<Corporation[]>([]);

  //fetch corporation callback
  const fetchCorporationCallback = (data: { corporations: Corporation[] }) =>
    setCorporations(data.corporations);

  //fetch init corporations
  const fetchInitCorporations = () =>
    fetchGet(INIT_CORPORATION_ROUTE, fetchCorporationCallback);

  //get params for init corporations
  useEffect(() => fetchInitCorporations, []);

  //add corporation
  const addCorporation = (name: string) =>
    fetchPost(INIT_CORPORATION_ROUTE, { name }, fetchInitCorporations);

  //delete corporation
  const deleteCorporation = (name: string) =>
    fetchDelete(INIT_CORPORATION_ROUTE, { name }, fetchInitCorporations);

  return (
    <InitialCorporationContext.Provider value={{ corporations, addCorporation, deleteCorporation }}>
      {children}
    </InitialCorporationContext.Provider>
  );
};

export default InitialStatsContextProvider;
