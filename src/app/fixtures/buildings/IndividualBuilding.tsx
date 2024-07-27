import { Row, Col, Input, InputNumber } from "antd";

interface IndividualBuildingProps {
  name: string
}

const IndividualBuilding = (props : IndividualBuildingProps) => {
  return (
    <>
      <Row><Col style={{width: '100px'}}>Building Name</Col><Col><Input defaultValue={props.name}></Input></Col></Row>
      <h4>Building Cost</h4>
      <Row><Col style={{width: '100px'}}>Water</Col><InputNumber></InputNumber></Row>
      <Row><Col style={{width: '100px'}}>Rare Metal</Col><InputNumber></InputNumber></Row>
      <Row><Col style={{width: '100px'}}>Oxygen</Col><InputNumber></InputNumber></Row>
      <Row><Col style={{width: '100px'}}>Food</Col><InputNumber></InputNumber></Row>
      <Row><Col style={{width: '100px'}}>Synthetics</Col><InputNumber></InputNumber></Row>
      <Row><Col style={{width: '100px'}}>Minerals</Col><InputNumber></InputNumber></Row>
      <h4>Daily Production</h4>
      <Row><Col style={{width: '100px'}}>Water</Col><InputNumber></InputNumber></Row>
      <Row><Col style={{width: '100px'}}>Rare Metal</Col><InputNumber></InputNumber></Row>
      <Row><Col style={{width: '100px'}}>Oxygen</Col><InputNumber></InputNumber></Row>
      <Row><Col style={{width: '100px'}}>Food</Col><InputNumber></InputNumber></Row>
      <Row><Col style={{width: '100px'}}>Synthetics</Col><InputNumber></InputNumber></Row>
      <Row><Col style={{width: '100px'}}>Minerals</Col><InputNumber></InputNumber></Row>
      <h4>Daily Cost</h4>
      <Row><Col style={{width: '100px'}}>Water</Col><InputNumber></InputNumber></Row>
      <Row><Col style={{width: '100px'}}>Rare Metal</Col><InputNumber></InputNumber></Row>
      <Row><Col style={{width: '100px'}}>Oxygen</Col><InputNumber></InputNumber></Row>
      <Row><Col style={{width: '100px'}}>Food</Col><InputNumber></InputNumber></Row>
      <Row><Col style={{width: '100px'}}>Synthetics</Col><InputNumber></InputNumber></Row>
      <Row><Col style={{width: '100px'}}>Minerals</Col><InputNumber></InputNumber></Row>
    </>
  );
};

export default IndividualBuilding;
