import { TILE_ROUTE } from "@/constants";
import { fetchPut } from "@/functions/database/database.fetchers";
import { InitTile, MAP_COLUMNS, MAP_ROWS } from "@/types";
import { createContext, useEffect, useState } from "react";

interface IndividualTileContextProps {
  tile: InitTile;
  saveTile: () => void;
  updateResourcesAvailable: (resources: string[]) => void;
  updateHazards: (hazards: string[]) => void;
  updateLandmark: (landmark: string) => void;
}

const initProps: IndividualTileContextProps = {
  tile: {
    row: 1,
    column: "A",
    resourcesAvailable: [],
    hazards: [],
  },
  saveTile: () => {},
  updateResourcesAvailable: () => {},
  updateHazards: () => {},
  updateLandmark: () => {},
};

export const IndividualTileContext =
  createContext<IndividualTileContextProps>(initProps);

export const IndividualTileContextProvider = ({
  children,
  tile,
}: {
  children: React.ReactNode;
  tile: InitTile;
}) => {
  const [newTile, setNewTile] = useState<InitTile>(tile);

  const saveTile = () => {
    fetchPut(TILE_ROUTE, newTile);
  };
  const updateResourcesAvailable = (resources: string[]) => {
    const tileCopy: InitTile = JSON.parse(JSON.stringify(newTile));
    tileCopy.resourcesAvailable = resources;
    setNewTile(tileCopy);
  };

  const updateHazards = (hazards: string[]) => {
    const tileCopy: InitTile = JSON.parse(JSON.stringify(newTile));
    tileCopy.hazards = hazards;
    setNewTile(tileCopy);
  };

  const updateLandmark = (landmark: string) => {
    const tileCopy: InitTile = JSON.parse(JSON.stringify(newTile));
    tileCopy.landmark = landmark;
    setNewTile(tileCopy);
  };

  return (
    <IndividualTileContext.Provider
      value={{
        tile: newTile,
        saveTile,
        updateResourcesAvailable,
        updateHazards,
        updateLandmark,
      }}
    >
      {children}
    </IndividualTileContext.Provider>
  );
};
