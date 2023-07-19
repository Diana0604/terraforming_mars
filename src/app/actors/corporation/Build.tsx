"use client"

import { useState } from "react"
import { Card } from "antd"
import { Select } from 'antd';
import { PRESET_BUILDINGS_LIST } from "@/constants";
import { Tile } from "@/types";

interface BuildProps {
  tilesCanBuild: Tile[]
}

const Build = (props: BuildProps) => {




  const [building, setBuilding] = useState<Boolean>(false)

  const buildingSelectOptions = PRESET_BUILDINGS_LIST.map((value) => {
    return {
      value: value,
      label: value
    }
  })

  const tilesSelectOptions = props.tilesCanBuild.map((tile) => {
    return {
      value: `${tile.column}${tile.row}`,
      label: `${tile.column}${tile.row}`
    }
  })

  return (<>
    <button onClick={() => { setBuilding(!building) }}>Add Building</button>
    {
      building && (<Card>
        <div>
          <span style={{ width: "200px" }}>building: </span> <Select showSearch style={{ width: "200px" }} options={buildingSelectOptions}></Select>
        </div>
        <div>
          <span style={{ width: "200px" }}>tile: </span> <Select showSearch style={{ width: "200px" }} options={tilesSelectOptions}></Select>
        </div>
      </Card>)
    }
  </>)
}

export default Build