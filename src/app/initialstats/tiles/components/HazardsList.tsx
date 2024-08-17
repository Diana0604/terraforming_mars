import { Row, Col, Input, Button } from "antd";
import Title from "antd/lib/typography/Title";
import { useContext, useState } from "react";
import { DeleteFilled } from "@ant-design/icons";
import { IndividualTileContext } from "../IndividualTileContext";

const HazardsList = () => {

  const {tile, updateHazards} = useContext(IndividualTileContext);

  const [newElement, setNewElement] = useState<string>("");

  const handleAddElement = () => {
    if (newElement.length === 0) return;
    const allElements = JSON.parse(JSON.stringify(tile.hazards));
    allElements.push(newElement);
    updateHazards(allElements);
  };

  const handleDeleteElement = (landmark: string) => {
    const allElements = JSON.parse(JSON.stringify(tile.hazards));
    const index = allElements.indexOf(landmark);
    allElements.splice(index, 1);
    updateHazards(allElements);
  };

  return (
    <>
      <Title level={5}>{"Hazards"}</Title>

      {/* list of present elements which can be deleted */}
      {tile.hazards.map((value, index) => (
        <Row key={index} className="mb-5 flex-one-right">
          <Col className="mr-5">{value}</Col>
          <Col>
            <DeleteFilled
              onClick={() => {
                handleDeleteElement(value);
              }}
              className="delete-icon align-righ"
            />
          </Col>
        </Row>
      ))}

      {/* add new element */}
      <Row>
        <Input
          className="mr-5"
          style={{ width: "100px" }}
          onChange={(event) => {
            setNewElement(event.target.value);
          }}
          value={newElement}
        ></Input>
        <Button onClick={handleAddElement}>Add</Button>
      </Row>
    </>
  );
};

export default HazardsList;
