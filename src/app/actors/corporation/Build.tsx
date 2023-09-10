"use client"
//types
import { Tile } from "@/types";

//database routes
import { BUILD_DATABASE_ROUTE } from "@/constants";
import { PRESET_BUILDINGS_LIST } from "@/showVariables";

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
  const [buildingIndex, setBuildingIndex] = useState<number>()
  const [tile, setTile] = useState<String>()



  //create list for building type choosing select
  const buildingSelectOptions = PRESET_BUILDINGS_LIST.map((value, index) => {
    return {
      value: index,
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
      if(buildingIndex === undefined) return;
      const res = await fetch(BUILD_DATABASE_ROUTE, { method: "post", body: JSON.stringify({ ...PRESET_BUILDINGS_LIST[buildingIndex], corporation: props.corporationName, tile: tile }) })
      const data = await res.json()
      if (data.error) {
        setErrorDisplayMessage(data.error)
        setTimeout(() => setErrorDisplayMessage(undefined), 3000)
        return
      }
    } catch (error) {
      console.log('error', error)
    }
  }



  return (<>
    <Button onClick={toggleBuildMenu}>{buildingButtonMessage}</Button>
    {
      building && (
          <Card>
            <h3>Add Building to Tile</h3>
            <div>
              <span style={{ width: "200px" }}>building: </span> <Select showSearch onChange={setBuildingIndex} style={{ width: "200px" }} options={buildingSelectOptions}></Select>
            </div>
            <div>
              <span style={{ width: "200px" }}>tile: </span> <Select showSearch onChange={setTile} style={{ width: "200px" }} options={tilesSelectOptions}></Select>
            </div>
            <Button onClick={onClickBuild} disabled={(buildingIndex === undefined) && !tile}>Build</Button>
            <div>{errorDisplayMessage}</div>
          </Card>
      )
    }
  </>)
}

export default Build