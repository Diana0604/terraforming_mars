"use client"
import { ALERT_MANAGER_ROUTE } from "@/constants";
import { Button, Card, Col } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ChangeEvent, MouseEventHandler, useState } from "react";


const AlertManager = () => {

    const [message, setMessage] = useState("");

    const handleTextAreaChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
       setMessage(e.target.value)
    }

    const sendAlert = async() => {
            const res =  await fetch(ALERT_MANAGER_ROUTE, { method: "post", body: JSON.stringify({ message: message }) })
            const data = await res.json();
            if (data.error) return; //TODO: set display message
    }

    const removeAlert = async () => {
        try {
            //const res = await fetch(`${TILE_ROUTE}`)
            const res = await fetch(ALERT_MANAGER_ROUTE, { method: 'delete' })
          } catch (error) {
            console.log(error)
          }
    }

    return (
        <Card style={{display: "flex", flexDirection: "column", rowGap: "10px", padding: "10px"}}>
            <h3>Trigger Alert to Map</h3>
            <TextArea style={{maxWidth: "500px"}} onChange={(e) => handleTextAreaChange(e)}></TextArea>
            <Col>
                <Button onClick={sendAlert}>Send Instant Alert to Map</Button>
                <Button onClick={removeAlert}>Remove Alert from Map</Button>
            </Col>
        </Card>
    )
}

export default AlertManager;