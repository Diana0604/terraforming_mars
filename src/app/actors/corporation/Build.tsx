"use client"

import { useState } from "react"
import { Card, Select, Button } from "antd"
import { BUILD_DATABASE_ROUTE, PRESET_BUILDINGS_LIST } from "@/constants";
import { Tile } from "@/types";

interface BuildProps {
  tilesCanBuild: Tile[],
  corporationName: String
}

/**
 * Interactive building menu
 */
const Build = (props: BuildProps) => {

  //keep state of when building is in progress
  const [building, setBuilding] = useState<Boolean>(false)
  const [buildingButtonMessage, setBuildingButtonMessage] = useState<String>("Show Build Menu")

  //save buildingType and tile desired to build
  const [buildingType, setBuildingType] = useState<String>()
  const [tile, setTile] = useState<String>()

  //create list for building type choosing select
  const buildingSelectOptions = PRESET_BUILDINGS_LIST.map((value) => {
    return {
      value: value.buildingType,
      label: value.buildingType
    }
  })

  //create list for tile choosing select
  const tilesSelectOptions = props.tilesCanBuild.map((tile) => {
    return {
      value: `${tile.column}${tile.row}`,
      label: `${tile.column}${tile.row}`
    }
  })

  //toggle build menu event handler
  const toggleBuildMenu = async () => {
    if (building) {
      setBuildingButtonMessage("Show Build Menu")
    }
    else {
      setBuildingButtonMessage("Hide Build Menu")
    }
    setBuilding(!building)
  }

  //onclickbuild event handler
  const onClickBuild = async () => {
    const res = await fetch(BUILD_DATABASE_ROUTE, { method: "post", body: JSON.stringify({ buildingType: buildingType, corporation: props.corporationName, tile: tile }) })
    const message = await res.json()

    //reload to display new result in server component
    window.location.reload();
  }

  return (<>
    <Button onClick={toggleBuildMenu}>{buildingButtonMessage}</Button>
    {
      building && (<Card>
        <div>
          <span style={{ width: "200px" }}>building: </span> <Select showSearch onChange={setBuildingType} style={{ width: "200px" }} options={buildingSelectOptions}></Select>
        </div>
        <div>
          <span style={{ width: "200px" }}>tile: </span> <Select showSearch onChange={setTile} style={{ width: "200px" }} options={tilesSelectOptions}></Select>
        </div>
        <Button onClick={onClickBuild} disabled={!buildingType && !tile}>Build</Button>
      </Card>)
    }
  </>)
}

export default Build