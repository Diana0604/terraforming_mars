import { Collapse, CollapseProps } from "antd"
import IndividualBuilding from "./IndividualBuilding";

const BuildingFixtures = () => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Test One",
      children: <IndividualBuilding name="Test One" />,
    },
    {
      key: "2",
      label: "Test Two",
      children: <IndividualBuilding name="Test Two" />,
    },
  ];
  return (<><Collapse items={items}/></>)
}

export default BuildingFixtures