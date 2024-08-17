import { Input } from "antd";
import { useContext } from "react";
import { IndividualTileContext } from "../IndividualTileContext";
import Title from 'antd/lib/typography/Title'

const LandmarkInput = () => {
  const { tile, updateLandmark } = useContext(IndividualTileContext);

  return (
    <>
      <Title level={5}>{"Landmark"}</Title>
      <Input
        value={tile.landmark}
        onChange={(event) => updateLandmark(event.target.value)}
      ></Input>
    </>
  );
};

export default LandmarkInput;
