"use client"
//types
import { Tile } from "@/types";

//database routes
import { BUILD_DATABASE_ROUTE, PRESET_BUILDINGS_LIST } from "@/constants";

//react
import { useState } from "react"

//ant design
import { Card, Select, Button } from "antd"

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

  //error display message
  const [errorDisplayMessage, setErrorDisplayMessage] = useState<String>()

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
    try {
      const res = await fetch(BUILD_DATABASE_ROUTE, { method: "post", body: JSON.stringify({ buildingType: buildingType, corporation: props.corporationName, tile: tile }) })
      const data = await res.json()
      if (data.error) {
        setErrorDisplayMessage(data.error)
        setTimeout(() => setErrorDisplayMessage(undefined), 3000)
        return
      }

      //reload to display new result in server component
      window.location.reload();
    } catch (error) {
      console.log('error', error)
    }
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
        <div>{errorDisplayMessage}</div>
      </Card>)
    }
  </>)
}

export default Build