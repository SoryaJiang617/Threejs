import React from "react";
import { useRenderer } from "./renderer";

const RoomScene = () => {
  const { mountRef } = useRenderer();

  return <div style={{ flex: 1 }} ref={mountRef} />;
};

export default RoomScene;
