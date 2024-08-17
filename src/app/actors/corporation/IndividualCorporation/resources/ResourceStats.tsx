//types
import { Corporation } from "@/types";

//constants
import {
  PLAYER1_CORPORATION_NAME,
  PLAYER2_CORPORATION_NAME,
} from "@/fixtures/corporations.fixtures";

//react
import { useContext } from "react";

//context
import { CorporationsContext } from "@/contexts/CorporationsContexts";

//components
import UpdateResource from "./UpdateResource";
import { IndividualCorporationContext } from "../../contexts/IndividualCorporationContext";

/**
 * Display list of resources and update form
 */
const ResourceStats = () => {
  //get corporations from context
  // const corporations = useContext(CorporationsContext)
  const corporation = useContext(IndividualCorporationContext);

  //method to prepare display for each corporation

  return (
    <div>
      <h4>Resources Stats</h4>
      <div>
        In this menu you can add and remove resources manually. Use negative
        numbers to remove resources.
      </div>
      {corporation.resourcesOwned.map((resource, index) => (
        <div key={index}>
          <div>
            {resource.name} : {resource.quantity}
          </div>
          <UpdateResource
            corporation={corporation.name}
            resource={resource.name}
            quantity={0}
          ></UpdateResource>
        </div>
      ))}
    </div>
  );
};

export default ResourceStats;
