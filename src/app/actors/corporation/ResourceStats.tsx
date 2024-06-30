//types
import { Corporation } from "@/types"

//constants
import { PLAYER1_CORPORATION_NAME, PLAYER2_CORPORATION_NAME } from "@/showVariables"

//react
import { useContext } from "react"

//context
import { CorporationsContext } from "@/contexts/CorporationsContexts"

//components
import UpdateResource from "./UpdateResource"

interface ResourceStatsProps {
  corporationName: string
}

/**
 * Display list of resources and update form
 */
const ResourceStats = (props: ResourceStatsProps) => {

  //get corporations from context
  const corporations = useContext(CorporationsContext)

  //method to prepare display for each corporation
  const resourcesStatsDisplay = (corporation: Corporation) => {
    return (
      <div>
        <h4>Resources Stats</h4>
        <div>
          In this menu you can add and remove resources manually. Use negative numbers to remove resources.
        </div>
        {corporation.resourcesOwned.map((resource, index) => (
          <div key={index}>
            <div>
              {resource.name} : {resource.quantity}
            </div>
            <UpdateResource corporation={props.corporationName} resource={resource.name} quantity={0}></UpdateResource>
          </div>
        ))}
      </div>
    )
  }

  //call resourcesStatsDisplay according to corporation name
  if (props.corporationName === PLAYER1_CORPORATION_NAME) {
    return resourcesStatsDisplay(corporations[0])
  }

  if (props.corporationName === PLAYER2_CORPORATION_NAME) {
    return resourcesStatsDisplay(corporations[1])
  }

  return <>Unknown Corporation</>
}

export default ResourceStats