//types
import { Building, Tile } from "@/types"
import { ReactNode } from "react"

//database
import tileModel from "@/functions/database/models/tile.model"

//components
import Build from "./Build"
import buildingModel from "@/functions/database/models/building.model"

interface IBuildingStatsProps {
  buildingsOwned: Building[],
  corporationName: string,
  corporationId: string
}

/**
 * Display stats of all buildings owned by a specific corporation
 */
const BuildingStats = async (props: IBuildingStatsProps) => {

  //build list with children of all buildings owned
  const buildingsOwnedDisplay : ReactNode[] = []
  for (const index in props.buildingsOwned) {
    //get building type and tile
    const building = await buildingModel.findById(props.buildingsOwned[index])
    const tile = await tileModel.findById(building.tile)

    //react node object to display
    const display = (<div key={index}>
      <div style={{ fontWeight: "bold" }}>Type: {building.buildingType}</div>
      <div>Tile: {`${tile.column}`}{tile.row}</div>
    </div>)
    buildingsOwnedDisplay.push(display)
  }

  //get the tiles that this company can build on
  const tilesCanBuild: Tile[] = await JSON.parse(JSON.stringify(await tileModel.find({ $or: [{ colonizedBy: props.corporationId }, { colonizedBy: null }] })))

  return (<>
    <div>
      {buildingsOwnedDisplay}
    </div>

    <Build tilesCanBuild={tilesCanBuild} corporationName={props.corporationName} />
  </>)
}

export default BuildingStats