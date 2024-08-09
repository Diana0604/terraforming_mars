import { Row, Col, Button } from "antd";
import Input from "antd/es/input/Input";
import { useContext, useEffect, useState } from "react";
import { InitialResourcesContext } from "./InitialResourcesContext";

const ResourceStats = () => {
  const { resources, addNewResource, deleteResource } = useContext(
    InitialResourcesContext
  );

  useEffect(() => {
    console.log('from resource stats', resources)
  }, [resources])

  const [newResource, setResource] = useState<string>("");

  return (
    <>
      <h4>List all resources that can be used / found</h4>
      {resources.map((resource, index) => (
        <Row key={index}>
          <Col className="mr-5 mb-5">
            <Input defaultValue={resource}></Input>
          </Col>
          <Col>
            <Button
              danger
              onClick={() => {
                deleteResource(resource);
              }}
            >
              Delete
            </Button>
          </Col>
        </Row>
      ))}
      <Row>
        <Col className="mr-5">
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
