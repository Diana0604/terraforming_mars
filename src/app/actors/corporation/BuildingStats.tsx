"use client"
//constants
import { ACTORS_CORPORATION_NAME, PLAYER_CORPORATION_NAME } from "@/constants"

//types
import { Corporation, Tile } from "@/types"
import { useContext } from "react"

//contexts
import { CorporationsContext } from "@/contexts/CorporationsContexts"

//components
import Build from "./Build"

interface IBuildingStatsProps {

  corporationName: string,
}

/**
 * Display stats of all buildings owned by a specific corporation
 */
const BuildingStats = (props: IBuildingStatsProps) => {

  const { playerCorporation, actorsCorporation } = useContext(CorporationsContext)

  //setup the display for each corporation
  const setupCorportaion = (corporation: Corporation) => {
    return <div>
      <div>
        Buildings currently owned by this corporation:
        {
          corporation.buildingsOwned.map((building, index) => {
            return (
              <div key={index}>
                <div style={{ fontWeight: "bold" }}>Type: {building.buildingType}</div>
                <div>Tile: {`${building.tile.column}`}{building.tile.row}</div>
              </div>
            )
          })
        }
      </div>
      <div>
        Buildings that will be built in the next round:
        {
          corporation.newBuildingsNextRound?.map((building, index) => {
            return (
              <div key={index}>
                <div style={{ fontWeight: "bold" }}>Type: {building.buildingType}</div>
                <div>Tile: {`${building.tile.column}`}{building.tile.row}</div>
              </div>
            )
          })
        }
      </div>
      < Build tilesCanBuild={corporation.tilesCanBuild as Tile[]} corporationName={corporation.name}></Build>
    </div >
  }

  //call setupCorporation depending on corporation name
  if (props.corporationName === PLAYER_CORPORATION_NAME) {
    return setupCorportaion(playerCorporation)
  }
  if (props.corporationName === ACTORS_CORPORATION_NAME) {
    return setupCorportaion(actorsCorporation)
  }

  return <>Unknown Corporation</>
}

export default BuildingStats