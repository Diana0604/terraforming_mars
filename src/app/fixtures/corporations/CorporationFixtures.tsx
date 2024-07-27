import { Collapse, CollapseProps } from "antd";
import IndividualCorporation from "./IndividualCorporation";

const CorporationFixtures = () => {
  const items: CollapseProps["items"] = [
    { key: "1", label: "Player One", children: <IndividualCorporation name="Player One" /> },
    { key: "2", label: "Player Two", children: <IndividualCorporation name="Player Two" /> },
  ];

  return (
    <>
      <Collapse items={items} />
    </>
  );
};

export default CorporationFixtures;
