import { Collapse, CollapseProps } from "antd";
import BuildingStats from "./buildings/BuildingStats";
import ResourceStats from "./resources/ResourceStats";
import CorporationStats from "./corporations/CorporationStats";
import RoundStats from "./round/RoundStats";

const Admin = () => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Resource Fixtures",
      children: <ResourceStats />,
    },
    {
      key: "2",
      label: "Building Fixtures",
      children: <BuildingStats />,
    },
    {
      key: "3",
      label: "Corporation Fixtures",
      children: <CorporationStats />,
    },
    {
      key: "4",
      label: "Round Fixtures",
      children: <RoundStats />,
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
