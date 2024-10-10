import React from "react";
import RoomScene from "./RoomScene";
import Gallery from "./Gallery";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Gallery />
      <RoomScene />
    </div>
  );
}

export default App;
