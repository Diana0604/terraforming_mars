"use client";
//constants
import {
  PLAYER1_CORPORATION_NAME,
  PLAYER2_CORPORATION_NAME,
} from "@/fixtures/corporations.fixtures";

//types
import { Corporation, Tile } from "@/types";
import { useContext } from "react";

//contexts
import { IndividualCorporationContext } from "../IndividualCorporationContext";

//components
import Build from "./Build";
import { Button, Card, Row } from "antd";
import { BUILD_DATABASE_ROUTE } from "@/constants";

/**
 * Display stats of all buildings owned by a specific corporation
 */
const BuildingStats = () => {
  const corporation = useContext(IndividualCorporationContext);

  //setup the display for each corporation

  return (
    <Card>
      {/* currently owned */}
      <Row>
        Buildings currently owned by this corporation:
        {corporation.buildingsOwned.map((building, index) => {
          building.tile = building.tile as Tile;
          return (
            <div key={index}>
              <div style={{ fontWeight: "bold" }}>
                Tile: {`${building.tile.column}`}
                {building.tile.row}
              </div>
              <span>Type: {building.buildingType}</span>
              <Button
                onClick={async () => {
                  const res = await fetch(BUILD_DATABASE_ROUTE, {
                    method: "delete",
                    body: JSON.stringify({ id: building._id }),
                  });
                }}
              >
                Destroy building
              </Button>
            </div>
          );
        })}
      </Row>

      {/* next round */}
      <Row>
        Buildings that will be built in the next round:
        {corporation.newBuildingsNextRound?.map((building, index) => {
          building.tile = building.tile as Tile;
          return (
            <div key={index}>
              <div style={{ fontWeight: "bold" }}>
                Type: {building.buildingType}
              </div>
              <div>
                Tile: {`${building.tile.column}`}
                {building.tile.row}
              </div>
            </div>
          );
        })}
      </Row>

      {/* build new */}
      <Build
        corporationName={corporation.name}
        corporationId={corporation._id}
      ></Build>
    </Card>
  );
};

export default BuildingStats;
