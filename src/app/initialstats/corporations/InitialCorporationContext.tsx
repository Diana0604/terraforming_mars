"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Corporation, InitCorporation } from "@/types";
import { INIT_CORPORATION_ROUTE } from "@/constants";
import {
  fetchDelete,
  fetchGet,
  fetchPost,
  fetchPut,
} from "@/functions/database/database.fetchers";

interface initialStatsProps {
  corporations: InitCorporation[];
  addCorporation: (name: string) => void;
  deleteCorporation: (name: string) => void;
  updateCorporation: (oldName: string, corporation: InitCorporation) => void;
}

const initProps = {
  corporations: [],
  addCorporation: () => {},
  deleteCorporation: () => {},
  updateCorporation: () => {},
};

export const InitialCorporationContext =
  createContext<initialStatsProps>(initProps);

const InitialStatsContextProvider = ({ children }: { children: ReactNode }) => {
  const [corporations, setCorporations] = useState<InitCorporation[]>([]);

  //fetch corporation callback
  const fetchCorporationCallback = (data: Corporation[]) =>
    setCorporations(data);

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

  //update corporation
  const updateCorporation = (oldName: string, corporation: InitCorporation) => {
    const body = { oldName, ...corporation };
    fetchPut(INIT_CORPORATION_ROUTE, body, fetchInitCorporations);
  };

  return (
    <InitialCorporationContext.Provider
      value={{
        corporations,
        addCorporation,
        deleteCorporation,
        updateCorporation,
      }}
    >
      {children}
    </InitialCorporationContext.Provider>
  );
};

export default InitialStatsContextProvider;
