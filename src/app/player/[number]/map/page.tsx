"use client";
import styles from "./map.module.css";
import Chart from "./components/chart";
import Timer from "./components/timer";
import InfoBar from "./components/infoBar";
import Alert from "./components/alert";
import { useEffect, useState } from "react";
import { Corporation } from "@/types";
import { fetchGet } from "@/functions/database/database.fetchers";
import { CORPORATION_ROUTE } from "@/constants";
import IndividualCorporationContextProvider from "@/app/actors/corporation/IndividualCorporation/IndividualCorporationContext";

interface PlayerParams {
  number: string;
}

export default function Home({ params }: { params: PlayerParams }) {
  //check the number on ulr is correct
  const number = Number(params.number);
  console.log(number);
  console.log(params.number);
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
      <main className={styles.main}>
        <Timer />
        <InfoBar />
        <Chart num={number} />
        <Alert />
      </main>
    </IndividualCorporationContextProvider>
  );
}
