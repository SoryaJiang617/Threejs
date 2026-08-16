import { Suspense, useState, useEffect, Component } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useProgress } from "@react-three/drei";
import * as THREE from "three";
import Artwork from "./scene/Artwork";
import Sculpture from "./scene/Sculpture";
import CameraRig from "./scene/CameraRig";
import {
  ARTWORK_CENTER_Y,
  ARTWORK_RADIUS,
  ROOM_CENTER_Y,
  ROOM_HEIGHT,
  ROOM_RADIUS,
  PEDESTAL_CENTER_Y,
  PEDESTAL_HEIGHT,
  PEDESTAL_RADIUS,
  SCULPTURE_CENTER_Y,
  GALLERY_CAMERA_POSITION,
} from "../constants/scene";
import { calculateArtworkAngle } from "../utils/calculateArtworkAngle";

class SceneErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div className="rounded bg-red-800 px-4 py-2 text-sm text-white">
            Failed to load gallery assets.
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}

function SceneLoader() {
  const progress = useProgress((state) => state.progress);

  return (
    <Html center>
      <div className="rounded bg-neutral-900 px-4 py-2 text-sm text-white">
        Loading gallery {Math.round(progress)}%
      </div>
    </Html>
  );
}

function Room() {
  return (
    <group>
      <mesh position={[0, ROOM_CENTER_Y, 0]} receiveShadow>
        <cylinderGeometry
          args={[ROOM_RADIUS, ROOM_RADIUS, ROOM_HEIGHT, 64, 1, true]}
        />
        {/* roomWallsGeometry = new THREE.CylinderGeometry(10,10,10,64,1,true); */}
        <meshStandardMaterial
          color="#d6d3d1"
          roughness={0.9}
          side={THREE.BackSide}
        />
      </mesh>
      {/* ground */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[ROOM_RADIUS, 64]} />
        <meshStandardMaterial color="#5f3d2d" roughness={0.72} metalness={0} />
      </mesh>
    </group>
  );
}
function Pedestal() {
  return (
    <mesh position={[0, PEDESTAL_CENTER_Y, 0]} castShadow receiveShadow>
      <cylinderGeometry
        args={[PEDESTAL_RADIUS, PEDESTAL_RADIUS, PEDESTAL_HEIGHT, 32]}
      />
      {/* THREE.CylinderGeometry(1, 1, 4, 32); */}
      <meshStandardMaterial color="#b8b0a4" roughness={0.45} metalness={0} />
    </mesh>
  );
}

const RoomScene = ({ photos = [], cameraMode, selectedPhotoId, onSelect }) => {
  const visiblePhotos = photos.slice(0, 20);
  const selectedPhotoIndex = visiblePhotos.findIndex(
    (photo) => photo.id === selectedPhotoId,
  );
  const [isOrbiting, setIsOrbiting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (cameraMode !== "sculpture") {
      setIsOrbiting(false);
    }
  }, [cameraMode]);

  return (
    <div className="h-full w-full">
      <Canvas shadows camera={{ position: GALLERY_CAMERA_POSITION }}>
        <color attach="background" args={["#171717"]} />

        <ambientLight intensity={0.5} />
        <directionalLight
          position={[4, 8, 4]}
          intensity={2}
          color="#fff4e6"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <Room />
        <Pedestal />

        <SceneErrorBoundary>
          <Suspense fallback={<SceneLoader />}>
            <Sculpture />
            {visiblePhotos.map((photo, index) => {
              const angle = calculateArtworkAngle(index, visiblePhotos.length);
              const x = Math.sin(angle) * ARTWORK_RADIUS;
              const z = -Math.cos(angle) * ARTWORK_RADIUS;

              return (
                <Artwork
                  key={photo.id}
                  imageUrl={photo.url}
                  position={[x, ARTWORK_CENTER_Y, z]}
                  rotation={[0, -angle, 0]}
                  selected={photo.id === selectedPhotoId}
                  onSelect={() => onSelect(photo)}
                />
              );
            })}
          </Suspense>
        </SceneErrorBoundary>

        <CameraRig
          cameraMode={cameraMode}
          onArrive={() => setIsOrbiting(true)}
          selectedPhotoIndex={selectedPhotoIndex}
          artworkCount={visiblePhotos.length}
          artworkRadius={ARTWORK_RADIUS}
        />
        <OrbitControls
          enabled={
            cameraMode === "gallery" ||
            (cameraMode === "sculpture" && isOrbiting)
          }
          target={
            cameraMode === "sculpture"
              ? [0, SCULPTURE_CENTER_Y, 0]
              : [0, ARTWORK_CENTER_Y, 0]
          }
          autoRotate={
            cameraMode === "sculpture" && isOrbiting && !prefersReducedMotion
          }
          autoRotateSpeed={0.5}
          enableDamping
          dampingFactor={0.08}
          enablePan={false}
          minDistance={0.5}
          maxDistance={8}
        />
      </Canvas>
    </div>
  );
};

export default RoomScene;
