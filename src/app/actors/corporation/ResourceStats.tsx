//types
import { Resource } from "@/types"
//components
import UpdateResource from "./UpdateResource"

interface ResourceStatsProps {
  resourcesOwned: Resource[],
  corporationName: string
}

/**
 * Display list of resources and update form
 */
const ResourceStats = (props: ResourceStatsProps) => {
  <h4>Resources Stats</h4>
  return props.resourcesOwned.map((resource, index) => (
    <div key={index}>
      {resource.name}: {resource.quantity}
      <UpdateResource corporation={props.corporationName} resource={resource.name} quantity={0}></UpdateResource>
    </div>
  ))
}

export default ResourceStats