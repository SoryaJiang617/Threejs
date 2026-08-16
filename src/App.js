import React, { useState } from "react";
import RoomScene from "./components/RoomScene";
import Gallery from "./components/Gallery";
import { useGetPhotosQuery } from "./services/api";

function App() {
  const { data: photos = [], isLoading, isError } = useGetPhotosQuery(20);

  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [cameraMode, setCameraMode] = useState("gallery");

  const handleSelect = (photo) => {
    setSelectedPhotoId(photo.id);
    setCameraMode("artwork");
  };
  const handleViewSculpture = () => {
    setCameraMode((currentMode) =>
      currentMode === "sculpture" ? "gallery" : "sculpture",
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-950 text-neutral-100">
      <div className="w-1/4 overflow-hidden border-r border-neutral-800">
        <Gallery
          photos={photos}
          isLoading={isLoading}
          isError={isError}
          selectedPhotoId={selectedPhotoId}
          onSelect={handleSelect}
        />
      </div>

      <div className="relative w-3/4">
        <button
          type="button"
          onClick={handleViewSculpture}
          className="
            absolute right-4 top-4 z-10
            rounded-lg bg-white px-4 py-2
            text-sm font-medium text-neutral-900
            shadow-md hover:bg-neutral-200
          "
        >
          {cameraMode === "sculpture" ? "Back to Gallery" : "View Sculpture"}
        </button>

        <RoomScene
          photos={photos}
          cameraMode={cameraMode}
          selectedPhotoId={selectedPhotoId}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}

export default App;
