"use client"
import { Collapse, CollapseProps } from "antd";
import Text from "antd/lib/typography/Text";

import BuildingStats from "./buildings/BuildingStats";
import ResourceStats from "./resources/InitialResourceStats";
import CorporationStats from "./corporations/InitialCorporationStats";
import RoundStats from "./round/RoundStats";
import InitialStatsContextProvider from "./corporations/InitialCorporationContext";
import InitialResourcesContextProvider from "./resources/InitialResourcesContext";

const Admin = () => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Resources",
      children: (
        <InitialResourcesContextProvider>
          <ResourceStats />
        </InitialResourcesContextProvider>
      ),
    },
    {
      key: "2",
      label: "Buildings",
      children: <BuildingStats />,
    },
    {
      key: "3",
      label: "Corporations",
      children: (
        <InitialStatsContextProvider>
          <CorporationStats />
        </InitialStatsContextProvider>
      ),
    },
    {
      key: "4",
      label: "Round",
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
