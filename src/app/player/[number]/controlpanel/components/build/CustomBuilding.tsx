"use client";
//database routes
import { BUILD_DATABASE_ROUTE } from "@/constants";

//react
import { useContext, useEffect, useState } from "react";

//ant design
import { Card, Select, Button, Input, Row } from "antd";
import { TilesContext } from "@/contexts/TileContext";
import { Resource } from "@/types";
import { fetchPost } from "@/functions/database/database.fetchers";
import { MessageContext } from "@/contexts/MessageContext";
import { IndividualCorporationContext } from "@/app/actors/corporation/IndividualCorporation/IndividualCorporationContext";
import styles from "../../controlpanel.module.css";
import { InitialResourcesContext } from "@/contexts/InitialResourcesContext";
import EditResourceStats from "@/app/initialstats/components/EditResourceStats";

/**
 * Interactive building menu
 */
const CustomBuilding = (props: { onBuild: () => void }) => {
  const { success, error } = useContext(MessageContext);

  // resources from context
  const { resources } = useContext(InitialResourcesContext);

  // get corporation form context
  const corporation = useContext(IndividualCorporationContext);

  // get tiles from context
  const { tiles } = useContext(TilesContext);

  //save buildingType and tile desired to build
  const [tile, setTile] = useState<String>();

  //setters
  const [buildingType, setBuildingType] = useState<string>("");
  const [dailyCost, setDailyCost] = useState<Resource[]>([]);
  const [dailyProduction, setdailyProduction] = useState<Resource[]>([]);
  const [buildingCost, setBuildingCost] = useState<Resource[]>([]);

  // populate all costs as zero
  useEffect(() => {
    const initResources: Resource[] = resources.map((value) => {
      return { name: value, quantity: 0 };
    });
    setDailyCost(initResources);
    setdailyProduction(initResources);
    setBuildingCost(initResources);
  }, [resources]);

  //create list for tile choosing select
  const filteredTiles = tiles
    .filter(
      (tile) =>
        !tile.destroyed &&
        (!tile.colonizedBy || tile.colonizedBy._id === corporation._id)
    )
    .map((tile) => {
      return {
        value: `${tile.column}${tile.row}`,
        label: `${tile.column}${tile.row}`,
      };
    });

  // callback for receiving building post response
  const postBuildingCallback = async (response: any) => {
    const data = await response.json();
    if (data.error) return error(data.error);
    return success("Database udpated");
  };

  //onclickbuild event handler
  const onClickBuild = () => {
    // let them know it's been built
    props.onBuild();

    // check building type is defined
    if (buildingType === undefined) return;

    // create body
    const body = {
      buildingType,
      corporation: corporation.name,
      tile,
      custom: true,
    };

    // update database
    fetchPost(BUILD_DATABASE_ROUTE, body, postBuildingCallback);
  };

  return (
    <Card
      className={styles.basic}
      style={{
        position: "absolute",
        top: "0",
        width: "70vw",
        zIndex: "1",
      }}
    >
      <h3>Add Custom Building to Tile</h3>

      <Row>
        {/* building type */}
        <div style={{ marginBottom: "10px" }}>
          <span style={{ width: "200px" }}>building name: </span>{" "}
          <Input
            onChange={(event) => setBuildingType(event.target.value)}
            style={{ width: "200px" }}
          />
        </div>

        {/* choose tile  */}
        <div style={{ marginBottom: "10px" }}>
          <span style={{ width: "200px", marginLeft: "10px" }}>tile: </span>{" "}
          <Select
            showSearch
            onChange={setTile}
            style={{ width: "70px" }}
            options={filteredTiles}
          ></Select>
        </div>
      </Row>
      {/* cost */}
      <EditResourceStats
        className={styles.custom_building}
        title={"Cost"}
        resources={resources}
        resourceList={buildingCost}
        setter={setBuildingCost}
      />

      {/* daily cost */}
      <EditResourceStats
        className={styles.custom_building}
        title={"Daily Cost"}
        resources={resources}
        resourceList={dailyCost}
        setter={setDailyCost}
      />

      {/* production */}
      <EditResourceStats
        className={styles.custom_building}
        title={"Daily Production"}
        resources={resources}
        resourceList={dailyProduction}
        setter={setdailyProduction}
      />

      <Button className={styles.basic} onClick={onClickBuild}>
        Build
      </Button>
    </Card>
  );
};

export default CustomBuilding;
