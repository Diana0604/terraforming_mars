import { Collapse, CollapseProps } from "antd";
import BuildingFixtures from "./buildings/BuildingFixtures";
import ResourceFixtures from "./resources/ResourceFixtures";

const Admin = () => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Resource Fixtures",
      children: <ResourceFixtures />,
    },
    {
      key: "2",
      label: "Building Fixtures",
      children: <BuildingFixtures />,
    },
  ];

  return (
    <div>
      This is the fixtures page. You can change the initial value of things
      here.
      <Collapse items={items} />
    </div>
  );
};

export default Admin;
