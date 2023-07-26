"use client"
//react hooks
import { useState } from "react";

//database routes constants
import { RESET_DATABASE_ROUTE } from "@/constants";


const ResetButton = () => {

  const [displayMessage, setDisplayMessage] = useState<String>()

  const onClick = async () => {
    //set display message to calculating
    setDisplayMessage("Resetting database")

    //reset database
    const res = await fetch(RESET_DATABASE_ROUTE, { method: "post" });
    const data = await res.json()
    if (data.error) {
      setDisplayMessage(data.error)
      return
    }
    //reload to display new result in server component
    window.location.reload();

  }

  return (
    <div>
      <button onClick={onClick}>Reset Database</button>
      {
        displayMessage ? <div>{displayMessage}</div> : <></>
      }
    </div>
  )
}

export default ResetButton