"use client";
import IndividualCorporationContextProvider from "@/app/actors/corporation/IndividualCorporation/IndividualCorporationContext";
import { CORPORATION_ROUTE } from "@/constants";
import { fetchGet } from "@/functions/database/database.fetchers";
import { Corporation } from "@/types";
import { useState, useEffect } from "react";
import styles from "./controlpanel.module.css";
import BuildingStats from "@/app/actors/corporation/IndividualCorporation/build/BuildingStats";
import DisplayResources from "./components/DisplayReources";
import { Row } from "antd";

interface PlayerParams {
  number: string;
}

const ControlPanelPage = ({ params }: { params: PlayerParams }) => {
  //check the number on ulr is correct
  const number = Number(params.number);
  if (isNaN(number) || number < 0)
    return <div>Number needs to be a number greater than 0</div>;

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

  return (
    <IndividualCorporationContextProvider name={corporation.name}>
      <Row style={{height: "100vh"}}>
        <BuildingStats />
        <DisplayResources />
      </Row>
    </IndividualCorporationContextProvider>
  );
};

export default ControlPanelPage;
