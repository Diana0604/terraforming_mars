"use client";
import { ALERT_MANAGER_ROUTE } from "@/constants";
import { fetchDelete, fetchPost } from "@/functions/database/database.fetchers";
import { Button, Card, Col } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ChangeEvent, useState } from "react";

const AlertManager = () => {
  const [message, setMessage] = useState("");

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendAlert = () => fetchPost(ALERT_MANAGER_ROUTE, { message: message });

  const removeAlert = () => {
    setMessage("");
    fetchDelete(ALERT_MANAGER_ROUTE, {});
  };

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
        padding: "10px",
      }}
    >
      <h3>Trigger Alert to Map</h3>
      <TextArea
        value={message}
        style={{ maxWidth: "500px" }}
        onChange={(e) => handleTextAreaChange(e)}
      ></TextArea>
      <Col>
        <Button onClick={sendAlert}>Send Instant Alert to Map</Button>
        <Button onClick={removeAlert}>Remove Alert from Map</Button>
      </Col>
    </Card>
  );
};

export default AlertManager;
