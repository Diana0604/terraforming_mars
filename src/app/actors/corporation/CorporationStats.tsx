"use client";

//antd
import { Collapse } from "antd";

//components
import { useEffect, useState } from "react";
import { Corporation } from "@/types";
import { fetchGet } from "@/functions/database/database.fetchers";
import { CORPORATION_ROUTE } from "@/constants";
import IndividualCorporationContextProvider from "./IndividualCorporation/IndividualCorporationContext";
import IndividualCorporation from "./IndividualCorporation/IndividualCorporation";

/**
 * Stats display of all playing corporations
 */
const CorporationStats = () => {
  const [corporations, setCorporations] = useState<Corporation[]>([]);
  const [items, setItems] = useState<any>();

  const handleGetCorporations = (data: { corporations: Corporation[] }) =>
    setCorporations(data.corporations);

  useEffect(() => {
    fetchGet(CORPORATION_ROUTE, handleGetCorporations);
  }, []);

  useEffect(() => {
    //build items array for Collapse
    const newItems = corporations.map((corporation, index) => {
      return {
        key: index,
        label: corporation.name,
        children: buildChildren(corporation.name),
      };
    });

    setItems(newItems);
  }, [corporations]);

  //build children elements for each collapsible in the collapse
  const buildChildren = (corporationName: string) => (
    <IndividualCorporationContextProvider name={corporationName}>
      <IndividualCorporation />
    </IndividualCorporationContextProvider>
  );

  return (
    <>
      <Collapse items={items} defaultActiveKey={[0, 1]} />
    </>
  );
};

export default CorporationStats;
