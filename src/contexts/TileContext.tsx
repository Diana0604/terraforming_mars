import { TILE_ROUTE } from "@/constants";
import { compareTiles } from "@/functions/comparers";
import { Tile } from "@/types";
import React, { useState } from "react";
import { fetchGet, fetchPost } from "@/functions/database/database.fetchers";
import { useInterval } from "usehooks-ts";

//tiles can be accessed from context
type contextProps = {
  tiles: Tile[];
};

//setup necessary empty objects for typescript compliance
const emptyTiles: Tile[] = [];

//initial corporation values
const initialTileProps: contextProps = {
  tiles: emptyTiles,
};

//build context
export const TilesContext: React.Context<contextProps> =
  React.createContext(initialTileProps);

//build context provider
export const TilesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //corporation objects and setters
  const [tiles, setTiles] = useState<Tile[]>(initialTileProps.tiles);

  // when tiles come back, check they are not empty and sort
  const updateTilesCallback = (data: { tiles: Tile[] }) => {
    const newTiles = data.tiles;

    if (newTiles.length === 0) return fetchPost(TILE_ROUTE, {});

    newTiles.sort(compareTiles);

    setTiles(newTiles);
  };

  // set an interval to update tiles every second
  const updateTiles = () => fetchGet(TILE_ROUTE, updateTilesCallback);

  useInterval(updateTiles, 1000);

  //return provider values
  return (
    <TilesContext.Provider value={{ tiles }}>{children}</TilesContext.Provider>
  );
};
