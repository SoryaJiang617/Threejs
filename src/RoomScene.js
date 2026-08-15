import { Suspense,useState,useEffect,} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useProgress,} from "@react-three/drei";
import * as THREE from "three";
import Artwork from "./scene/Artwork";
import Sculpture from "./scene/Sculpture";
import CameraRig from "./scene/CameraRig";

const ROOM_RADIUS = 10;
const ARTWORK_WALL_OFFSET = 0.6;
const ARTWORK_RADIUS = ROOM_RADIUS - ARTWORK_WALL_OFFSET;

function SceneLoader() {
  const progress = useProgress((state) => state.progress);

  return (
    <Html center>
      <div className="whitespace-nowrap rounded-lg bg-black/75 px-4 py-2 text-sm text-white shadow-lg">
        Loading gallery {Math.round(progress)}%
      </div>
    </Html>
  );
}
// function SingleArtwork({ imageUrl, position, rotation, selected,}) {

function Room() {
  return (
    <group>
      <mesh position={[0, 5, 0]} receiveShadow>
        <cylinderGeometry args={[10, 10, 10, 64, 1, true]}/>{/* roomWallsGeometry = new THREE.CylinderGeometry(10,10,10,64,1,true); */}
        <meshStandardMaterial color="#d6d3d1" roughness={0.9} side={THREE.BackSide}/>
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[10, 64]} />
        <meshStandardMaterial color="#5f3d2d" roughness={0.72} metalness={0}/>
      </mesh>
    </group>
  );
}
function Pedestal() {
  return (
    <mesh position={[0, 2, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[1, 1, 4, 32]}/>{/* THREE.CylinderGeometry(1, 1, 4, 32); */}
      <meshStandardMaterial color="#b8b0a4" roughness={0.45} metalness={0}/>
    </mesh>
  );
}
// function Sculpture() {
// function CameraRig({ cameraMode, onArrive, selectedPhotoIndex, artworkCount,}) {

const RoomScene = ({ photos = [],cameraMode, selectedPhotoId,}) => {
  const visiblePhotos = photos.slice(0, 20);
  const selectedPhotoIndex =
  visiblePhotos.findIndex((photo) => photo.id === selectedPhotoId);
  const [isOrbiting, setIsOrbiting] =useState(false);
  useEffect(() => {
    if (cameraMode !== "sculpture") {
      setIsOrbiting(false);
    }
  }, [cameraMode]);
  return (
    <div className="h-full w-full">
      <Canvas shadows camera={{ position: [0, 5, 8] }}>{/* y=5 房间高度 10 的中间附近;z=8在房间 radius 10 里面 */}
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

        <Suspense fallback={<SceneLoader />}>
          <Sculpture />
          {visiblePhotos.map((photo, index) => {
            const angle = (index / visiblePhotos.length) * Math.PI * 2;
            const x = Math.sin(angle) * ARTWORK_RADIUS;
            const z = -Math.cos(angle) * ARTWORK_RADIUS;

            return (
              <Artwork
                key={photo.id}
                imageUrl={photo.url}
                position={[x, 3, z]}
                rotation={[0, -angle, 0]}
                selected={photo.id === selectedPhotoId}
              />
            );
          })}
        </Suspense>
        <CameraRig 
          cameraMode={cameraMode} 
          onArrive={() => setIsOrbiting(true)}
          selectedPhotoIndex={selectedPhotoIndex}
          artworkCount={visiblePhotos.length}
          artworkRadius={ARTWORK_RADIUS}/>
        <OrbitControls
          enabled={
            cameraMode === "gallery" || (cameraMode === "sculpture" && isOrbiting)
          }
          target={cameraMode === "sculpture" ? [0, 4.75, 0] : [0, 3, 0]}// 4.75 = 算出来的 sculpture 中心;3 = 你现在画作的统一中心高度
          autoRotate={cameraMode === "sculpture" && isOrbiting}
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
