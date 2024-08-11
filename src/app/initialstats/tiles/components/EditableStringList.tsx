import { Row, Col, Input, Button } from "antd";
import Title from "antd/lib/typography/Title";
import { useState } from "react";
import { DeleteFilled } from "@ant-design/icons";

interface EditableStringListProps {
  title: string;
}

const EditableStringList = (props: EditableStringListProps) => {
  const [list, setList] = useState<string[]>([]);

  const [newElement, setNewElement] = useState<string>("");

  const handleAddElement = () => {
    if (newElement.length === 0) return;
    const allElements = JSON.parse(JSON.stringify(list));
    allElements.push(newElement);
    setList(allElements);
    setNewElement("");
  };

  const handleDeleteElement = (landmark: string) => {
    const allElements = JSON.parse(JSON.stringify(list));
    const index = allElements.indexOf(landmark);
    allElements.splice(index, 1);
    setList(allElements);
  };

  return (
    <>
      <Title level={5}>{props.title}</Title>

      {/* list of present elements which can be deleted */}
      {list.map((value, index) => (
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

export default EditableStringList;