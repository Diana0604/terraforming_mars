import { Row, Col } from "antd";
import Input from "antd/es/input/Input";
import { useContext } from "react";
import { InitialResourcesContext } from "./InitialResourcesContext";

const ResourceStats = () => {
  const { resources } = useContext(InitialResourcesContext);

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
    </>
  );
};

export default ResourceStats;
