import { Row, Col, Button } from "antd";
import Input from "antd/es/input/Input";
import { useContext, useState } from "react";
import { InitialResourcesContext } from "../../../contexts/InitialResourcesContext";
import DeleteStat from "../components/DeleteStat";

const ResourceStats = () => {
  const { resources, addNewResource, deleteResource } = useContext(
    InitialResourcesContext
  );

  const [newResource, setResource] = useState<string>("");

  const handleAddResource = () => {
    addNewResource(newResource);
    setResource("");
  };

  return (
    <>
      <h4>List all resources that can be used / found</h4>
      {resources.map((resource, index) => (
        <Row key={index}>
          <Col className="mr-5 mb-5">
            <Input disabled={true} defaultValue={resource}></Input>
          </Col>
          <DeleteStat handleDelete={() => deleteResource(resource)} />
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
          <Button disabled={!newResource.length} onClick={handleAddResource}>Add Resource</Button>
        </Col>
      </Row>
    </>
  );
};

export default ResourceStats;
