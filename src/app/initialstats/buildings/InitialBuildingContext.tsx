"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { BuildingConstant } from "@/types";
import { INIT_BUILDINGS_ROUTE } from "@/constants";
import {
  fetchDelete,
  fetchGet,
  fetchPost,
  fetchPut,
} from "@/functions/database/database.fetchers";

interface InitialStatsProps {
  buildings: BuildingConstant[];
  addBuilding: (name: string) => void;
  deleteBuilding: (name: string) => void;
  updateBuilding: (oldName: string, corporation: BuildingConstant) => void;
}

const initProps: InitialStatsProps = {
  buildings: [],
  addBuilding: () => {},
  deleteBuilding: () => {},
  updateBuilding: () => {},
};

export const InitialBuildingContext =
  createContext<InitialStatsProps>(initProps);

const InitialBuildingContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [buildings, setBuildings] = useState<BuildingConstant[]>([]);

  //fetch building callback
  const fetchBuildingCallback = (data: BuildingConstant[]) =>
    setBuildings(data);

  //fetch init building
  const fetchInitBuildings = () =>
    fetchGet(INIT_BUILDINGS_ROUTE, fetchBuildingCallback);

  //get params for init buildings
  useEffect(() => {
    fetchInitBuildings();
  }, []);

  //add building
  const addBuilding = (type: string) =>
    fetchPost(INIT_BUILDINGS_ROUTE, { type }, fetchInitBuildings);

  //delete building
  const deleteBuilding = (type: string) =>
    fetchDelete(INIT_BUILDINGS_ROUTE, { type }, fetchInitBuildings);

  //update building
  const updateBuilding = (type: string, building: BuildingConstant) => {
    const body = { type, ...building };
    fetchPut(INIT_BUILDINGS_ROUTE, body, fetchInitBuildings);
  };

  return (
    <InitialBuildingContext.Provider
      value={{
        buildings,
        addBuilding,
        deleteBuilding,
        updateBuilding,
      }}
    >
      {children}
    </InitialBuildingContext.Provider>
  );
};

export default InitialBuildingContextProvider;
