"use client"
//database routes
import { RESOURCE_DATABASE_ROUTE } from "@/constants"

//react hooks
import {useState } from "react"

interface UpdateStatProp {
  corporation: string,
  resource: string,
  quantity: number
}

/**
 * Update resource input and button to send info to database
 */
const UpdateResource = (props: UpdateStatProp) => {

  const [displayMessage, setDisplayMessage] = useState<string>()
  const [quantity, setQuantity] = useState<number>(0)

  const onClick = async () => {
    setDisplayMessage("Adding resource to database")
    const res = await fetch(RESOURCE_DATABASE_ROUTE, { method: "post", body: JSON.stringify({ quantity: quantity, corporation: props.corporation, resource: props.resource }) })
    const data = await res.json();
    if (data.error) {
      setDisplayMessage(data.error)
    }
    setTimeout(() => {
      setQuantity(0)
      setDisplayMessage(undefined)
    }, 3000)
  }

  return (<div>
    Add / Remove {props.resource}: <input type="number" value={quantity || 0} onChange={(event) => { setQuantity(Number(event.target.value)) }}></input>
    <button onClick={onClick}>Add</button>
    {displayMessage ? displayMessage : <></>}
  </div>)
}

export default UpdateResource