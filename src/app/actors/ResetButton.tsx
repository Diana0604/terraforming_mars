"use client";
//react hooks
import { useState } from "react";

//database routes constants
import { RESET_DATABASE_ROUTE } from "@/constants";
import { fetchPost } from "@/functions/database/database.fetchers";

const ResetButton = () => {
  const [displayMessage, setDisplayMessage] = useState<String>();

  const onClick = () => {
    //set display message to calculating
    setDisplayMessage("Resetting database");

    //reset database
    fetchPost(RESET_DATABASE_ROUTE, {});

    //reload window
    window.location.reload();
  };

  return (
    <div>
      <button onClick={onClick}>Reset Database</button>
      {displayMessage ? <div>{displayMessage}</div> : <></>}
    </div>
  );
};

export default ResetButton;
