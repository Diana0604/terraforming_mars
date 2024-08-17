import { TILE_ROUTE } from "@/constants";
import { fetchPut } from "@/functions/database/database.fetchers";
import { InitTile, MAP_COLUMNS, MAP_ROWS } from "@/types";
import { createContext, useState } from "react";

interface IndividualTileContextProps {
  tile: InitTile;
  saveTile: () => void;
  updateResourcesAvailable: (resources: string[]) => void;
}

const initProps: IndividualTileContextProps = {
  tile: {
    row: 1,
    column: "A",
    resourcesAvailable: [],
    hazards: [],
  },
  saveTile: () => {},
  updateResourcesAvailable: () => {}
};

export const IndividualTileContext =
  createContext<IndividualTileContextProps>(initProps);

export const IndividualTileContextProvider = ({
  children,
  tile
}: {
  children: React.ReactNode;
  tile: InitTile
}) => {

  const [newTile, setNewTile] = useState<InitTile>(tile);

  const saveTile = () => {
    fetchPut(TILE_ROUTE, newTile);
  };
  const updateResourcesAvailable = (resources : string[]) => {
    const tileCopy : InitTile = JSON.parse(JSON.stringify(newTile));
    tileCopy.resourcesAvailable = resources;
    setNewTile(tileCopy);
  }

  return (
    <IndividualTileContext.Provider value={{ tile : newTile, saveTile, updateResourcesAvailable }}>
      {children}
    </IndividualTileContext.Provider>
  );
};
