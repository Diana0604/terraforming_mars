import { Resource } from "@/types";
import { Card, Col, InputNumber, Space } from "antd";
import { SetStateAction } from "react";

interface Props {
  resources: string[];
  resourceList: Resource[];
  setter: (value: SetStateAction<Resource[]>) => void;
}

const EditResourceStats = (props: Props) => {
  const { resources, resourceList, setter } = props;

  return resources.map((resource, index) => {
    //inputValue will store the value in the input
    let inputValue = 0;

    //find resource index in the resourceList vector
    const resourceIndex = resourceList.map((v) => v.name).indexOf(resource);

    //if exists, update quantity
    if (resourceIndex != -1) inputValue = resourceList[resourceIndex].quantity;

    //on input change, update quantity of previously found index
    const onInputChange = (value: number | null) => {
      if (!value) return;
      const newResources: Resource[] = JSON.parse(JSON.stringify(resourceList));
      newResources[resourceIndex].quantity = value;
      setter(newResources);
    };

    return (
      <Col key={index} className="mr-5">
        <Space direction="vertical" size={16} />
        <Card size="small" title={resource}>
          <InputNumber value={inputValue} onChange={onInputChange} />
        </Card>
      </Col>
    );
  });
};

export default EditResourceStats;
