"use client"
import { useEffect, useState } from "react";
import { RESET_ROUTE } from "@/constants";


const MapUpload = () => {

  const [res, setRes] = useState<String>()

  const onClick = async () => {
    const res = await fetch(RESET_ROUTE, { method: "post" })
    const resJson = await res.json()
    setRes(resJson.message)
  }

  useEffect(() => {
    if (res) setTimeout(() => {
      setRes(undefined)
    }, 3000)
  }, [res])

  return (
    <div>
      <button onClick={onClick}>Reset Database</button>
      {
        res ? <div>Result from resetting: {res}</div> : <></>
      }
    </div>
  )
}

export default MapUpload