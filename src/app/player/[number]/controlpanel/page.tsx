"use client";
import { CORPORATION_ROUTE } from "@/constants";
import { fetchGet } from "@/functions/database/database.fetchers";
import { Corporation } from "@/types";
import { useState, useEffect, useRef } from "react";
import styles from "./controlpanel.module.css";
import BuildingStats from "./components/BuildingStats";
import DisplayResources from "./components/DisplayReources";
import { Row } from "antd";
import MessageContextProvider from "@/contexts/MessageContext";
import Stars from "../map/components/stars";
import Alert from "../map/components/alert";
import Timer from "../map/components/timer";

interface PlayerParams {
  number: string;
}

const ControlPanelPage = ({ params }: { params: PlayerParams }) => {
  const svg = useRef<SVGSVGElement>(null);

  // const [corporation, setCorporation] = useState<Corporation>();
  const placeholderCorp: Corporation = {
    name: "",
    resourcesOwned: [],
    buildingsOwned: [],
    tilesCanBuild: [],
    player: false,
  };
  const [corporation, setCorporation] = useState<Corporation>(placeholderCorp);

  //get corporations
  const handleGetCorporations = (data: { corporations: Corporation[] }) => {
    if (data.corporations.length < number + 1) return;
    setCorporation(data.corporations[number]);
  };

  useEffect(() => {
    fetchGet(CORPORATION_ROUTE, handleGetCorporations);
  }, []);

  //check the number on ulr is correct
  const number = Number(params.number);
  if (isNaN(number) || number < 0)
    return <div>Number needs to be a number greater than 0</div>;

  return (
    <div className={styles.main}>
      <Alert />
      <Timer />
      <svg
        ref={svg}
        style={{ width: "100vw", height: "100vh", position: "absolute" }}
      >
        <Stars />
      </svg>
      <MessageContextProvider>
        <Row className={`${styles.main}  ${styles.pt_20px}`}>
          <BuildingStats />
          <DisplayResources />
        </Row>
      </MessageContextProvider>
    </div>
  );
};

export default ControlPanelPage;
