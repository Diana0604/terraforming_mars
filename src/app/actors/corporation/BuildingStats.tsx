"use client"
//constants
import { ACTORS_CORPORATION_NAME, PLAYER_CORPORATION_NAME } from "@/showVariables"

//types
import { Corporation, Tile } from "@/types"
import { useContext } from "react"

//contexts
import { CorporationsContext } from "@/contexts/CorporationsContexts"

//components
import Build from "./Build"
import { Button } from "antd"
import { BUILD_DATABASE_ROUTE } from "@/constants"

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
                <div style={{ fontWeight: "bold" }}>Tile: {`${building.tile.column}`}{building.tile.row}</div>
                <span>Type: {building.buildingType}</span>
                <Button onClick={async () =>{
                  const res = await fetch(BUILD_DATABASE_ROUTE, {method: 'delete', body: JSON.stringify({id: building._id})})
                }}>Destroy building</Button>
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
      < Build corporationName={corporation.name} corporationId={corporation._id}></Build>
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