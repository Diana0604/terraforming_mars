"use client";

import MessageContextProvider from "@/contexts/MessageContext";
import TileDestroyer from "./TileDestroyer";
import { Card } from "antd";

const MapManager = () => {
  return (
    <Card>
      <div style={{ margin: "10px" }}>
        <h3 style={{ marginBottom: "10px" }}>Map Manager Menu</h3>
        <MessageContextProvider>
          <TileDestroyer />
        </MessageContextProvider>
      </div>
    </Card>
  );
};

export default MapManager;
