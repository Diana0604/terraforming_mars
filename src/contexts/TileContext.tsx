import { TILE_ROUTE } from "@/constants";
import { compareTiles } from "@/functions/comparers";
import { Tile } from "@/types";
import React, { useState, useEffect } from "react";
import { initTiles } from "@/constants";
import { fetchPost, fetchPut } from "@/functions/database/database.fetchers";

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

  useEffect(() => {
    //update corporations info every second by fetching from database
    const updateTiles = () => {
      try {
        fetch(TILE_ROUTE, { method: "get" }).then(
          async (response) => {
            const data = await response.json();

            const newTiles = data.tiles;

            if (newTiles.length === 0) {
              return fetchPost(TILE_ROUTE, {}, updateTiles);
            }

            newTiles.sort(compareTiles);

            setTiles(newTiles);
          },
          (error) => {
            console.log("error on fetch", error);
          }
        );
      } catch (error) {
        console.log("error on fetch", error);
      }
    };

    updateTiles();

    const interval = setInterval(updateTiles, 1000);

    //destroy interval at dismount
    return () => {
      clearInterval(interval);
    };
  }, []);

  //return provider values
  return (
    <TilesContext.Provider value={{ tiles }}>{children}</TilesContext.Provider>
  );
};
