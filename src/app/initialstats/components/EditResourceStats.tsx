import { HasChangedContext } from "@/contexts/HasChangedContext";
import { Resource } from "@/types";
import { Card, Col, InputNumber, Row, Space } from "antd";
import { SetStateAction, useContext } from "react";

interface Props {
  title: string;
  resources: string[];
  resourceList: Resource[];
  setter: (value: SetStateAction<Resource[]>) => void;
  className?: string;
}

const EditResourceStats = (props: Props) => {
  const { resources, resourceList, setter } = props;
  const { setHasChanged } = useContext(HasChangedContext);

  return (
    <>
      <h4>{props.title}</h4>
      <Row>
        {resources.map((resource, index) => {
          //inputValue will store the value in the input
          let inputValue = 0;

          //find resource index in the resourceList vector
          const resourceIndex = resourceList
            .map((v) => v.name)
            .indexOf(resource);

          //if exists, update quantity
          if (resourceIndex != -1)
            inputValue = resourceList[resourceIndex].quantity;

          //on input change, update quantity of previously found index
          const onInputChange = (value: number | null) => {
            const newValue = Number(value);
            if (isNaN(newValue)) return;
            const newResources: Resource[] = JSON.parse(
              JSON.stringify(resourceList)
            );
            newResources[resourceIndex].quantity = newValue;
            setter(newResources);
            setHasChanged(true);
          };

          return (
            <Col key={index} className={`mr-5`}>
              <Space direction="vertical" size={16} />
              <Card
                size="small"
                title={resource}
                classNames={{ title: props.className }}
                className={props.className}
              >
                <InputNumber value={inputValue} onChange={onInputChange} />
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default EditResourceStats;
