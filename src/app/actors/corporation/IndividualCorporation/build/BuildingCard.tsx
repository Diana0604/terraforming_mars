import { BUILD_DATABASE_ROUTE } from "@/constants";
import { fetchDelete } from "@/functions/database/database.fetchers";
import { Building } from "@/types";
import { DeleteFilled } from "@ant-design/icons";
import { Card } from "antd";

const BuildingCard = (building: Building) => {
  return (
    <Card style={{ width: 150 }}>
      <span>{building.buildingType}</span>
      <DeleteFilled
        onClick={() => fetchDelete(BUILD_DATABASE_ROUTE, { id: building._id })}
        className="delete-icon align-righ"
      />
    </Card>
  );
};

export default BuildingCard;
