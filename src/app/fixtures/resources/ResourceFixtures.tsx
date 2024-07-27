import { Row, Col } from "antd";
import Input from "antd/es/input/Input";

const ResourceFixtures = () => {
  return (
    <>
      <h4>List all resources that can be used / found</h4>
      <Row>
        <Col>
          <Input defaultValue="Water"></Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input defaultValue="Rare Metal"></Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input defaultValue="Oxygen"></Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input defaultValue="Food"></Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input defaultValue="Synthetics"></Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input defaultValue="Minerals"></Input>
        </Col>
      </Row>
    </>
  );
};

export default ResourceFixtures;
