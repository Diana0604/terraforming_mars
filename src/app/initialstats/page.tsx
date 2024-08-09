import { Collapse, CollapseProps } from "antd";
import Text from "antd/lib/typography/Text"

import BuildingStats from "./buildings/BuildingStats";
import ResourceStats from "./resources/ResourceStats";
import CorporationStats from "./corporations/InitialCorporationStats";
import RoundStats from "./round/RoundStats";
import InitialStatsContextProvider from "./corporations/InitialCorporationContext";


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
      children: (
        <InitialStatsContextProvider>
          <CorporationStats />
        </InitialStatsContextProvider>
      ),
    },
    {
      key: "4",
      label: "Round Fixtures",
      children: <RoundStats />,
    },
  ];

  return (
    <div>
      <Text>
        This is the initstats page. You can change the initial value of things
        here.
      </Text>
      <Collapse items={items} />
    </div>
  );
};

export default Admin;
