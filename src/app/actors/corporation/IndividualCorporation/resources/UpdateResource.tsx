"use client";
//database routes
import { RESOURCE_DATABASE_ROUTE } from "@/constants";

//react hooks
import { useContext, useState } from "react";
import { fetchPost } from "@/functions/database/database.fetchers";

import { Button, InputNumber } from "antd";
import { MessageContext } from "@/contexts/MessageContext";

interface UpdateStatProp {
  corporation: string;
  resource: string;
  quantity: number;
}

/**
 * Update resource input and button to send info to database
 */
const UpdateResource = (props: UpdateStatProp) => {
  const { success, error } = useContext(MessageContext);

  const [quantity, setQuantity] = useState<number>(0);

  const postCallback = async (res: any) => {
    const data = await res.json();
    setQuantity(0);
    if (data.error) return error("There was an error updating the database");
    return success("Database updated");
  };

  const onClick = async () => {
    //check quantity is a number
    if (Number.isNaN(Number(quantity))) return alert("Quantity must be number");

    const body = {
      quantity: quantity || "0",
      corporation: props.corporation,
      resource: props.resource,
    };

    fetchPost(RESOURCE_DATABASE_ROUTE, body, postCallback);
  };

  return (
    <div>
      Add / Remove {props.resource}:{" "}
      <InputNumber
        type="number"
        value={quantity}
        onChange={(value) => setQuantity(value || 0)}
      />
      <Button onClick={onClick}>Add</Button>
    </div>
  );
};

export default UpdateResource;
