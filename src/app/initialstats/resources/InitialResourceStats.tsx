import { Row, Col, Button } from "antd";
import Input from "antd/es/input/Input";
import { useContext, useState } from "react";
import { InitialResourcesContext } from "./InitialResourcesContext";

const ResourceStats = () => {
  const { resources, addNewResource } = useContext(InitialResourcesContext);

  const [newResource, setResource] = useState<string>("");

  return (
    <>
      <h4>List all resources that can be used / found</h4>
      {resources.map((resource, index) => (
        <Row key={index}>
          <Col>
            <Input defaultValue={resource}></Input>
          </Col>
        </Row>
      ))}
      <Row>
        <Col>
          <Input
            onChange={(event) => setResource(event.target.value)}
            value={newResource}
          />
        </Col>
        <Col>
          <Button onClick={() => addNewResource(newResource)}>
            Add Resource
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ResourceStats;
