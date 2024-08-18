//react
import { IndividualCorporationContext } from "@/app/actors/corporation/IndividualCorporation/IndividualCorporationContext";
import { Card } from "antd";
import { useContext } from "react";
import styles from "../controlpanel.module.css";

//components

/**
 * Display list of resources and update form
 */
const DisplayResources = () => {
  //get corporations from context
  // const corporations = useContext(CorporationsContext)
  const corporation = useContext(IndividualCorporationContext);

  //method to prepare display for each corporation

  return (
    <Card className={styles.panel}>
      <h4>Resources Stats</h4>
      {corporation.resourcesOwned.map((resource, index) => (
        <div key={index}>
          <div>
            {resource.name} : {resource.quantity}
          </div>
        </div>
      ))}
    </Card>
  );
};

export default DisplayResources;
