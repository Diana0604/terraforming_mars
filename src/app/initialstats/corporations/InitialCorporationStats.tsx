"use client";
import { Button, Col, Collapse, CollapseProps, Input, Row } from "antd";
import IndividualCorporation from "./IndividualCorporation";
import { useContext, useEffect, useState } from "react";
import { InitialCorporationContext } from "./InitialCorporationContext";

const InitialCorporationStats = () => {
  const { corporations, addCorporation } = useContext(InitialCorporationContext);

  const [items, setItems] = useState<CollapseProps["items"]>();
  const [corporationName, setCorporationName] = useState<string>("");

  useEffect(() => {
    if (corporations) {
      const newItems: CollapseProps["items"] = corporations.map(
        (corporation, index) => {
          return {
            key: index,
            label: corporation.name,
            children: <IndividualCorporation {...corporation} />,
          };
        }
      );
      setItems(newItems);
    }
  }, [corporations]);

  return (
    <>
      <Collapse items={items} />
      <Row>
        <Col className="mr-5">
          <Input
            onChange={(event) => setCorporationName(event.target.value)}
            value={corporationName}
          />
        </Col>
        <Col>
          <Button onClick={() => addCorporation(corporationName)}>
            Add Corporation
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default InitialCorporationStats;
