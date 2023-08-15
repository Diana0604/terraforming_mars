"use client"
//types
import { Resource, Tile } from "@/types";

//database routes
import { BUILD_DATABASE_ROUTE, PRESET_BUILDINGS_LIST, RESOURCES_LIST } from "@/constants";

//react
import { useRef, useState } from "react"

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

  //refs
  const resourceRequirementListElement = useRef<HTMLUListElement>(null);
  const productionResourceListElement = useRef<HTMLUListElement>(null);

  const [resourceRequirementList, setResourceRequirementList] = useState<Resource[]>([])
  const [productionResourceList, setProductionResourceList] = useState<Resource[]>([])

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

  const resourceListOptions = RESOURCES_LIST.map(resource => {
    return {
      value: resource,
      label: resource
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

  const setResource = () => {

  }

  const addResourceRequirement = () => {
    const resource:Resource = {
      name: "",
      quantity: 0
    }
    setResourceRequirementList([...resourceRequirementList, resource])
  }

  const addProductionResource = () => {
    const resource:Resource = {
      name: "",
      quantity: 0
    }
    setProductionResourceList([...productionResourceList, resource])
  }

  const updateResourceRequirementList = () => {
    resourceRequirementList.map(resource => {

    })
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
    } catch (error) {
      console.log('error', error)
    }
  }

  const createBuilding = () => {

    //create building constant and add it to preset buildings li
  }

  return (<>
    <Button onClick={toggleBuildMenu}>{buildingButtonMessage}</Button>
    {
      building && (
        <div style={{display: "flex", }}>

          <Card>
            <h3>Add Building to Tile</h3>
            <div>
              <span style={{ width: "200px" }}>building: </span> <Select showSearch onChange={setBuildingType} style={{ width: "200px" }} options={buildingSelectOptions}></Select>
            </div>
            <div>
              <span style={{ width: "200px" }}>tile: </span> <Select showSearch onChange={setTile} style={{ width: "200px" }} options={tilesSelectOptions}></Select>
            </div>
            <Button onClick={onClickBuild} disabled={!buildingType && !tile}>Build</Button>
            <div>{errorDisplayMessage}</div>
          </Card>
          <Card>
            <h3>Create New Building Type</h3>
            <form>
              <label htmlFor="building-name">Building Type</label>
              <input name="building-name"/>
              <Button onClick={addResourceRequirement}>Add Resource Requirement</Button>
              <ul ref={resourceRequirementListElement}>
                { resourceRequirementList.length > 0 && resourceRequirementList.map((resource) => {
                  return (<li key={Math.random()}>
                    <Select showSearch options={resourceListOptions}></Select>
                    <label>{resource.name}</label>
                    <input type="number"></input>
                  </li>)
                })}
              </ul>
              <Button onClick={addProductionResource}>Add Production Resource</Button>
              <ul ref={productionResourceListElement}></ul>
              <Button onClick={createBuilding} disabled>Create Building</Button>
            </form>

          </Card>
        </div>

      )
    }
  </>)
}

export default Build