import { Resource } from "@/types"
import UpdateResource from "../UpdateResource"

interface ResourceStatsProps {
  resourcesOwned: Resource[],
  corporationName: string
}

const ResourceStats = (props: ResourceStatsProps) => {
  return props.resourcesOwned.map((resource, index) => (
    <div key={index}>
      {resource.name}: {resource.quantity}
      <UpdateResource corporation={props.corporationName} resource={resource.name} quantity={0}></UpdateResource>
    </div>
  ))
}

export default ResourceStats