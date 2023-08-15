"use client"
//types
import { BuildingConstant, Resource, Tile } from "@/types";

//database routes
import { BUILD_DATABASE_ROUTE, PRESET_BUILDINGS_LIST, RESOURCES_LIST } from "@/constants";

//react
import { ChangeEvent, useRef, useState } from "react"

import { Button, Card, Select } from "antd"
import build from "next/dist/build";



const CustomBuilding = () => {

        //refs
    const resourceRequirementListElement = useRef<HTMLUListElement>(null);
    const productionResourceListElement = useRef<HTMLUListElement>(null);

    const [buildingType, setBuildingType] = useState<string>("");
    const [resourceRequirementList, setResourceRequirementList] = useState<Resource[]>([])
    const [productionResourceList, setProductionResourceList] = useState<Resource[]>([])
    const [dailyCostResourceList, setDailyCostResourceList] = useState<Resource[]>([])

    const resourceListOptions = RESOURCES_LIST.map(resource => {
        return {
          value: resource,
          label: resource
        }
      })

    const updateBuildingType = (e:ChangeEvent<HTMLInputElement>) => {
        setBuildingType(e.target.value);
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
      const addDailyCost = () => {
        const resource:Resource = {
          name: "",
          quantity: 0
        }
        setDailyCostResourceList([...dailyCostResourceList, resource])
      }
    
      const updateResourceRequirementName = (e:string, i:number) => {
        //check for duplicatesx
        resourceRequirementList.map(resource => {
            if(resource.name == e) {
                alert("Resource Already In Use")
                return;
            }
        })

        const newRequirementList = resourceRequirementList.map((resource, j) => {
            if (i === j) {
                resource.name = e;
            }
            return resource;
        });
        setResourceRequirementList(newRequirementList);
      }

      const updateResourceRequirementQuantity = (e:ChangeEvent<HTMLInputElement>, i:number) => {
        const newRequirementList = resourceRequirementList.map((resource, j) => {
            if (i === j && e.target) {
                resource.quantity = parseInt(e.target.value);
            }
            return resource;
        });
        setResourceRequirementList(newRequirementList);
      }

      const updateProductionResourceName = (e:string, i:number) => {
        //check for duplicatesx
        productionResourceList.map(resource => {
            if(resource.name == e) {
                alert("Resource Already In Use")
                return;
            }
        })

        const newRequirementList = productionResourceList.map((resource, j) => {
            if (i === j) {
                resource.name = e;
            }
            return resource;
        });
        setProductionResourceList(newRequirementList);
      }

      const updateProductionResourceQuantity = (e:ChangeEvent<HTMLInputElement>, i:number) => {
        const newRequirementList = productionResourceList.map((resource, j) => {
            if (i === j && e.target) {
                resource.quantity = parseInt(e.target.value);
            }
            return resource;
        });
        setProductionResourceList(newRequirementList);
      }

      const updateDailyCostName = (e:string, i:number) => {
        //check for duplicatesx
        dailyCostResourceList.map(resource => {
            if(resource.name == e) {
                alert("Resource Already In Use")
                return;
            }
        })

        const newRequirementList = dailyCostResourceList.map((resource, j) => {
            if (i === j) {
                resource.name = e;
            }
            return resource;
        });
        setDailyCostResourceList(newRequirementList);
      }

      const updateDailyCostQuantity = (e:ChangeEvent<HTMLInputElement>, i:number) => {
        const newRequirementList = dailyCostResourceList.map((resource, j) => {
            if (i === j && e.target) {
                resource.quantity = parseInt(e.target.value);
            }
            return resource;
        });
        setDailyCostResourceList(newRequirementList);
      }

      const createBuilding = () => {
        //check if name already exists
        PRESET_BUILDINGS_LIST.map(building => {
            if(buildingType.toLowerCase() == building.buildingType.toLowerCase()) {
                alert("Building with this name already exists");
                return;
            }
        })

        //create building constant and add it to preset buildings li
        const newBuilding:BuildingConstant = {
            buildingType: buildingType,
            dailyProduction: productionResourceList,
            dailyCost: dailyCostResourceList,
            buildingCost: resourceRequirementList
        }

        PRESET_BUILDINGS_LIST.push(newBuilding);
        alert("New Building Added")
      }

    return(
        <Card>
        <div>NOTE TO DANNY: The custom building menu is a work in progress so nothing will change in the database but you can play with it</div>
        <h3>Create New Building Type</h3>
        <div style={{display: "flex", flexDirection: "column", width: "40%"}}>
            <div style={{height: "40px"}}>
                <label htmlFor="building-name" style={{margin: "10px"}}>Building Type Name</label>
                <input name="building-name" style={{width: "250px"}}
                onChange={(e) => updateBuildingType(e)}/>
            </div>
            <Button onClick={addResourceRequirement}>Add Initial Cost</Button>
            <ul ref={resourceRequirementListElement} style={{listStyleType: "none"}}>
                { resourceRequirementList.length > 0 && resourceRequirementList.map((resource, i) => {
                return (<li key={i} >
                    <Select style={{width: "200px", padding: "5px"}} 
                    showSearch 
                    options={resourceListOptions} 
                    onChange={(e) => updateResourceRequirementName(e, i)}
                    ></Select>
                    <input type="number" style={{width: "250px"}}
                    onChange={(e) => updateResourceRequirementQuantity(e, i)}></input>
                </li>)
                })}
            </ul>
            <Button onClick={addProductionResource}>Add Daily Production</Button>
            <ul ref={productionResourceListElement} style={{listStyleType: "none"}}>
                { productionResourceList.length > 0 && productionResourceList.map((resource, i) => {
                return (<li key={i} >
                    <Select style={{width: "200px", padding: "5px"}} 
                    showSearch 
                    options={resourceListOptions} 
                    onChange={(e) => updateProductionResourceName(e, i)}
                    ></Select>
                    <input type="number" style={{width: "250px"}}
                    onChange={(e) => updateProductionResourceQuantity(e, i)}></input>
                </li>)
                })}
            </ul>
            <Button onChange={addDailyCost}>Add Daily Cost</Button>
            <ul style={{listStyleType: "none"}}>
                { dailyCostResourceList.length > 0 && dailyCostResourceList.map((resource, i) => {
                return (<li key={i} >
                    <Select style={{width: "200px", padding: "5px"}} 
                    showSearch 
                    options={resourceListOptions} 
                    onChange={(e) => updateDailyCostName(e, i)}
                    ></Select>
                    <input type="number" style={{width: "250px"}}
                    onChange={(e) => updateDailyCostQuantity(e, i)}></input>
                </li>)
                })}
            </ul>
            <Button onClick={createBuilding}>Create Building</Button>
        </div>
      </Card>
    )
}

export default CustomBuilding