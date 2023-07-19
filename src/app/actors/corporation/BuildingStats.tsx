import { Building, Tile } from "@/types"
import Build from "./Build"
import tileModel from "@/functions/database/models/tile.model"
import corporationModel from "@/functions/database/models/corporation.model"

interface IBuildingStatsProps {
  buildingsOwned: Building[],
  corporationName: string
}

const BuildingStats = async (props: IBuildingStatsProps) => {

  const corporation = await corporationModel.findOne({ name: props.corporationName })

  if (!corporation) throw Error("trying to access data from unknown corporation")

  const corporationId = corporation._id

  const tilesCanBuild: Tile[] = await JSON.parse(JSON.stringify(await tileModel.find({ $or: [{ colonizedBy: corporationId }, { colonizedBy: null }] })))

  return (<>
    <div>
      {props.buildingsOwned.map((building, index) => (<div key={index}>
        <div style={{ fontWeight: "bold" }}>Type: {building.buildingType}</div>
        <div>Tile: {`${building.tile.column}${building.tile.row}`}</div>
      </div>))
      }
    </div>
    <Build tilesCanBuild={tilesCanBuild} />
  </>)
}

export default BuildingStats