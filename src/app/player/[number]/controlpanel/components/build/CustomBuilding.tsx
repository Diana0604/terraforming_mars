"use client";
//database routes
import { BUILD_DATABASE_ROUTE } from "@/constants";

//react
import { useContext, useState } from "react";

//ant design
import { Card, Select, Button, Input, Row, InputNumber } from "antd";
import { TilesContext } from "@/contexts/TileContext";
import { BuildingConstant, Resource } from "@/types";
import { fetchGet, fetchPost } from "@/functions/database/database.fetchers";
import { MessageContext } from "@/contexts/MessageContext";
import { IndividualCorporationContext } from "@/app/actors/corporation/IndividualCorporation/IndividualCorporationContext";
import styles from "../../controlpanel.module.css";
import { InitialResourcesContext } from "@/app/initialstats/resources/InitialResourcesContext";

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
    const body = { buildingType, corporation: corporation.name, tile };

    // update database
    fetchPost(BUILD_DATABASE_ROUTE, body, postBuildingCallback);
  };

  return (
    <Card
      className={styles.basic}
      style={{
        position: "absolute",
        top: "0",
        // left: "50vw",
        width: "70vw",
        // marginLeft: "-250px",
        zIndex: "1",
      }}
    >
      <h3>Add Custom Building to Tile</h3>

      {/* building type */}
      <div style={{ marginBottom: "10px" }}>
        <span style={{ width: "200px" }}>building: </span>{" "}
        <Input
          onChange={(event) => setBuildingType(event.target.value)}
          style={{ width: "200px" }}
        />
      </div>

      <Row style={{ marginBottom: "10px" }}>
        {/* cost */}
        <div style={{ width: "200px" }}>
          <h4>Cost</h4>
          {resources.map((resource, index) => (
            <Row key={index} style={{ marginBottom: "5px" }}>
              <div style={{ width: "70px" }}>{resource}:</div> <InputNumber />
            </Row>
          ))}
        </div>

        {/* daily cost */}
        <div style={{ width: "200px" }}>
          <h4>Daily Cost</h4>
          {resources.map((resource, index) => (
            <Row key={index} style={{ marginBottom: "5px" }}>
              <div style={{ width: "70px" }}>{resource}:</div> <InputNumber />
            </Row>
          ))}
        </div>

        {/* production */}
        <div style={{ width: "200px" }}>
          <h4>Daily Production</h4>
          {resources.map((resource, index) => (
            <Row key={index} style={{ marginBottom: "5px" }}>
              <div style={{ width: "70px" }}>{resource}:</div> <InputNumber />
            </Row>
          ))}
        </div>
      </Row>
      {/* choose tile  */}
      <div style={{ marginBottom: "10px" }}>
        <span style={{ width: "200px" }}>tile: </span>{" "}
        <Select
          showSearch
          onChange={setTile}
          style={{ width: "200px" }}
          options={filteredTiles}
        ></Select>
      </div>

      <Button className={styles.basic} onClick={onClickBuild}>
        Build
      </Button>
    </Card>
  );
};

export default CustomBuilding;
