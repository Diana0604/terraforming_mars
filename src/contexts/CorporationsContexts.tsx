
import { CORPORATION_ROUTE, PLAYER_CORPORATION_NAME } from "@/constants";
import { Building, Corporation, Resource, Tile } from "@/types";
import React, { useState, useEffect } from "react";

//both corporations individually can be accessed from the context
type contextProps = {
  playerCorporation: Corporation,
  actorsCorporation: Corporation,
}

//setup necessary empty objects for typescript compliance
const emptyResources: Resource[] = []
const emptyBuildings: Building[] = []
const emptyTiles: Tile[] = []

//initial corporation values
const initialCorporationProps: contextProps = {
  playerCorporation: {
    name: 'loading',
    resourcesOwned: emptyResources,
    buildingsOwned: emptyBuildings,
    tilesCanBuild: emptyTiles
  },
  actorsCorporation: {
    name: 'loading',
    resourcesOwned: emptyResources,
    buildingsOwned: emptyBuildings,
    tilesCanBuild: emptyTiles
  },
};

//build context
export const CorporationsContext: React.Context<contextProps> = React.createContext(initialCorporationProps);

//build context provider
export const CorporationsContextProvider = ({ children }: { children: React.ReactNode }) => {

  //corporation objects and setters
  const [playerCorporation, setPlayerCorporation] = useState<Corporation>(initialCorporationProps.playerCorporation)
  const [actorsCorporation, setActorsCorporation] = useState<Corporation>(initialCorporationProps.actorsCorporation)


  useEffect(() => {

    //update corporations info every second by fetching from database
    const updateCorps = () => {
      try {
        fetch(CORPORATION_ROUTE, { method: 'get' }).then(async response => {
          const data = await response.json();
          data.corporations.forEach((corporation: Corporation) => {
            if (corporation.name === PLAYER_CORPORATION_NAME) setPlayerCorporation(corporation)
            else setActorsCorporation(corporation)
          })
        }, (error) => { console.log('error on fetch', error) })
      } catch (error) {
        console.log('error on fetch', error)
      }
    }

    updateCorps()

    const interval = setInterval(updateCorps, 1000)

    //destroy interval at dismount
    return () => {
      clearInterval(interval)
    }
  }, [])

  //return provider values
  return (
    <CorporationsContext.Provider value={{ playerCorporation, actorsCorporation }}>
      {children}
    </CorporationsContext.Provider>
  );
};

