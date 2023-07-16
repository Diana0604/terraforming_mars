"use client"
import { useEffect, useState } from "react";
import { RESET_DATABASE_ROUTE } from "@/constants";


const ResetButton = () => {

  const [displayMessage, setDisplayMessage] = useState<String>()

  const onClick = async () => {
    //set display message to calculating
    setDisplayMessage("Resetting database")

    //reset database
    try {
      await fetch(RESET_DATABASE_ROUTE, { method: "post" })
      //reload to display new result in server component
      window.location.reload();
    } catch (error: any) {
      //if error display error
      setDisplayMessage(error)
    }

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