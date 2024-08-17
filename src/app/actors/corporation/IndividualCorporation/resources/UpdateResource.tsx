"use client";
//database routes
import { RESOURCE_DATABASE_ROUTE } from "@/constants";
import RESOURCES_LIST from "../../../../../fixtures/resources.fixtures";

//react hooks
import { useState } from "react";

interface UpdateStatProp {
  corporation: string;
  resource: string;
  quantity: number;
}

/**
 * Update resource input and button to send info to database
 */
const UpdateResource = (props: UpdateStatProp) => {
  const [displayMessage, setDisplayMessage] = useState<string>();
  const [quantity, setQuantity] = useState<string>();

  const onClick = async () => {
    setDisplayMessage("Adding resource to database");

    //check quantity is a number
    if (Number.isNaN(Number(quantity))) return alert("Quantity must be number");

    const res = await fetch(RESOURCE_DATABASE_ROUTE, {
      method: "post",
      body: JSON.stringify({
        quantity: quantity || '0',
        corporation: props.corporation,
        resource: props.resource
      }),
    });
    const data = await res.json();
    if (data.error) {
      setDisplayMessage(data.error);
    }
    setQuantity("");
    setTimeout(() => {
      setDisplayMessage(undefined);
    }, 3000);
  };

  return (
    <div>
      Add / Remove {props.resource}:{" "}
      <input
        type="number"
        value={quantity || ""}
        onChange={(event) => {
          setQuantity(event.target.value);
        }}
      ></input>
      <button onClick={onClick}>Add</button>
      {displayMessage ? displayMessage : <></>}
    </div>
  );
};

export default UpdateResource;
