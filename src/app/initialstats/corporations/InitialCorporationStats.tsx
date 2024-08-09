"use client"
import { Collapse, CollapseProps } from "antd";
import IndividualCorporation from "./IndividualCorporation";
import { useContext, useEffect, useState } from "react";
import { InitialStatsContext } from "./InitialCorporationContext";

const InitialCorporationStats = () => {

  const {corporations} = useContext(InitialStatsContext);

  const [items, setItems] = useState<CollapseProps["items"]>();

  useEffect(() => {
    if(corporations) {
      const newItems: CollapseProps["items"] = corporations.map((corporation, index) => {
        return {
          key: index,
          label: corporation.name,
          children : <IndividualCorporation {...corporation}/>
        }
      });
      setItems(newItems);
    }
  }, [corporations])


  

  return (
    <>
      <Collapse items={items} />
    </>
  );
};

export default InitialCorporationStats;
