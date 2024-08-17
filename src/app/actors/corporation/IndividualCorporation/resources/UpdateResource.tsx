"use client";
//database routes
import { RESOURCE_DATABASE_ROUTE } from "@/constants";

//react hooks
import { useState } from "react";
import { fetchPost } from "@/functions/database/database.fetchers";

import { Button, InputNumber, message } from "antd";

interface UpdateStatProp {
  corporation: string;
  resource: string;
  quantity: number;
}

/**
 * Update resource input and button to send info to database
 */
const UpdateResource = (props: UpdateStatProp) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Database updated",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "There was an error updating the database",
    });
  };

  const [quantity, setQuantity] = useState<number>(0);

  const postCallback = async (res: any) => {
    const data = await res.json();
    setQuantity(0);
    if (data.error) return error();
    return success();
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
      {contextHolder}
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
