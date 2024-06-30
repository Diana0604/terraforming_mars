import { CORPORATION_ROUTE } from "@/constants";
import { PLAYER1_CORPORATION_NAME } from "@/showVariables";
import { Building, Corporation, Resource, Tile } from "@/types";
import React, { useState, useEffect } from "react";

//both corporations individually can be accessed from the context
type contextProps = Corporation[];

//setup necessary empty objects for typescript compliance
const emptyResources: Resource[] = [];
const emptyBuildings: Building[] = [];
const emptyTiles: Tile[] = [];

//initial corporation values
const initialCorporationProps: contextProps = [
  {
    name: "loading",
    resourcesOwned: emptyResources,
    buildingsOwned: emptyBuildings,
    tilesCanBuild: emptyTiles,
    player: true,
  },
  {
    name: "loading",
    resourcesOwned: emptyResources,
    buildingsOwned: emptyBuildings,
    tilesCanBuild: emptyTiles,
    player: false,
  },
];

//build context
export const CorporationsContext: React.Context<contextProps> =
  React.createContext(initialCorporationProps);

//build context provider
export const CorporationsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //corporation objects and setters
  const [player1Corporation, setPlayer1Corporation] = useState<Corporation>(
    initialCorporationProps[0]
  );
  const [player2Corporation, setPlayer2Corporation] = useState<Corporation>(
    initialCorporationProps[1]
  );

  useEffect(() => {
    //update corporations info every second by fetching from database
    const updateCorps = () => {
      try {
        fetch(CORPORATION_ROUTE, { method: "get" }).then(
          async (response) => {
            const data = await response.json();
            data.corporations.forEach((corporation: Corporation) => {
              if (corporation.name === PLAYER1_CORPORATION_NAME)
                setPlayer1Corporation(corporation);
              else setPlayer2Corporation(corporation);
            });
          },
          (error) => {
            console.log("error on fetch", error);
          }
        );
      } catch (error) {
        console.log("error on fetch", error);
      }
    };

    updateCorps();

    const interval = setInterval(updateCorps, 1000);

    //destroy interval at dismount
    return () => {
      clearInterval(interval);
    };
  }, []);

  //return provider values
  return (
    <CorporationsContext.Provider
      value={[player1Corporation, player2Corporation]}
    >
      {children}
    </CorporationsContext.Provider>
  );
};
