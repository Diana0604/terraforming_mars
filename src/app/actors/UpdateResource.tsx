"use client"

import { RESOURCE_DATABASE_ROUTE } from "@/constants"
import { useState } from "react"

interface UpdateStatProp {
  corporation: string,
  resource: string,
  quantity: number
}

const UpdateResource = (props: UpdateStatProp) => {

  const [displayMessage, setDisplayMessage] = useState<string>()
  const [quantity, setQuantity] = useState<number>(0)

  const onClick = async () => {
    try {
      setDisplayMessage("Adding resource to database")
      const res = await fetch(RESOURCE_DATABASE_ROUTE, { method: "post", body: JSON.stringify({ quantity: quantity, corporation: props.corporation, resource: props.resource }) })
      const message = await res.json();
      console.log(message.message)
      //reload to display new result in server component
      window.location.reload();
    } catch (error: any) {
      //if error display error
      setDisplayMessage(error)
    }
  }

  return (<div>
    Add / Remove stat: <input type="number" onChange={(event) => { setQuantity(Number(event.target.value)) }}></input>
    <button onClick={onClick}>Add</button>
    {displayMessage ? displayMessage : <></>}
  </div>)
}

export default UpdateResource