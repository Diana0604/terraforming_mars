import { InitTile } from "@/types";
import { Col, Card, Checkbox, Button, Row, Input } from "antd";
import { useContext, useEffect, useState } from "react";
import { InitialResourcesContext } from "../resources/InitialResourcesContext";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import Title from "antd/es/typography/Title";
import { DeleteFilled } from "@ant-design/icons";
import EditableStringList from "./components/EditableStringList";

const IndividualTile = (initTile: InitTile) => {
  const { resources } = useContext(InitialResourcesContext);

  const [resourcesPresent, setResourcesPresent] = useState<string[]>([]);

  const onCheckboxChange = (event: CheckboxChangeEvent, value: string) => {
    const newResources = JSON.parse(JSON.stringify(resourcesPresent));

    // case checked -> add to resources
    if (event.target.checked) {
      console.log("checked");
      console.log(resourcesPresent);
      newResources.push(value);
      console.log(newResources);
      setResourcesPresent(newResources);
    } else {
      console.log("not checked");
      //case unchecked -> remove from resources
      const index = newResources.indexOf(value);
      newResources.splice(index, 1);

      setResourcesPresent(newResources);
    }
  };
  useEffect(() => {
    console.log("resources present", resourcesPresent);
  }, [resourcesPresent]);

  return (
    <Col className="mr-10 mb-10">
      <Card size={"default"} title={`${initTile.column}${initTile.row}`}>
        {/* resources */}
        <Title level={5}>Resources</Title>

        {resources.map((value, index) => (
          <Row key={index}>
            <Checkbox onChange={(event) => onCheckboxChange(event, value)}>
              {value}
            </Checkbox>
          </Row>
        ))}

        {/* landmakrs */}
        <EditableStringList title={"Landmarks"} />

        {/* list of present hazards which can be deleted */}
        <EditableStringList title={"Hazards"} />
      </Card>
    </Col>
  );
};

export default IndividualTile;
