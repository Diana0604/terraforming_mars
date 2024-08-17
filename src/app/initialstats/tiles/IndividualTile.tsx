import { Col, Card, Checkbox, Row } from "antd";
import {
  useContext,
} from "react";
import { InitialResourcesContext } from "../resources/InitialResourcesContext";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import Title from "antd/es/typography/Title";
import HazardsList from "./components/HazardsList";
import UpdateStat from "../components/UpdateStat";
import { IndividualTileContext } from "./IndividualTileContext";

const IndividualTile = () => {
  const { resources } = useContext(InitialResourcesContext);
  const {tile, updateResourcesAvailable, saveTile} = useContext(IndividualTileContext);

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

  return (
    <Col className="mr-10 mb-10">
      <Card size={"default"} title={`${tile.column}${tile.row}`}>
        {/* resources */}
        <Title level={5}>Resources</Title>

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
        })}

        {/* landmakrs */}
        {/* <EditableStringList title={"Landmarks"} initialList={landmark} /> */}

        {/* list of present hazards which can be deleted */}
        <HazardsList list={tile.hazards} />

        {/* update tile */}
        <UpdateStat handleUpdate={saveTile} />
      </Card>
    </Col>
  );
};

export default IndividualTile;
