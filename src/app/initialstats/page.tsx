"use client";
import { Collapse, CollapseProps } from "antd";
import Text from "antd/lib/typography/Text";

import BuildingStats from "./buildings/InitialBuildingStats";
import ResourceStats from "./resources/InitialResourceStats";
import CorporationStats from "./corporations/InitialCorporationStats";
import RoundStats from "./round/RoundStats";
import InitialStatsContextProvider from "./corporations/InitialCorporationContext";
import InitialResourcesContextProvider from "./resources/InitialResourcesContext";
import InitialBuildingContextProvider from "./buildings/InitialBuildingContext";
import TileStats from "./tiles/TileStats";

const Admin = () => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Resources",
      children: <ResourceStats />,
    },
    {
      key: "2",
      label: "Buildings",
      children: (
        <InitialBuildingContextProvider>
          <BuildingStats />
        </InitialBuildingContextProvider>
      ),
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
    {
      key: "5",
      label: "Tiles",
      children: <TileStats />,
    },
  ];

  return (
    <div>
      <Text>
        This is the initstats page. You can change the initial value of things
        here.
      </Text>
      <InitialResourcesContextProvider>
        <Collapse items={items} />
      </InitialResourcesContextProvider>
    </div>
  );
};

export default Admin;
