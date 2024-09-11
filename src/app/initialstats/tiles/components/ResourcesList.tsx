import { Checkbox, Row } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import Title from "antd/es/typography/Title";
import { useContext } from "react";
import {InitialResourcesContext} from "../../../../contexts/InitialResourcesContext";
import { IndividualTileContext } from "../IndividualTileContext";
const ResourcesList = () => {

  const { resources } = useContext(InitialResourcesContext);
  const { tile, updateResourcesAvailable } = useContext(IndividualTileContext);

  const onCheckboxChange = (event: CheckboxChangeEvent, value: string) => {
    const newResources = JSON.parse(JSON.stringify(tile.resourcesAvailable));

    // case checked -> add to resources
    if (event.target.checked) {
      newResources.push(value);
      updateResourcesAvailable(newResources);
    } else {
      //case unchecked -> remove from resources
      const index = newResources.indexOf(value);
      newResources.splice(index, 1);

      updateResourcesAvailable(newResources);
    }
  };
  
  return (<><Title level={5}>Resources</Title>

    {resources.map((value, index) => {
      return (
        <Row key={index}>
          <Checkbox
            checked={tile.resourcesAvailable.includes(value)}
            onChange={(event) => onCheckboxChange(event, value)}
          >
            {value}
          </Checkbox>
        </Row>
      );
    })}</>)

}

export default ResourcesList;