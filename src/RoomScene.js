import { Suspense, useMemo, useRef,useState,useEffect,} from "react";
import { Canvas,useFrame,useThree, } from "@react-three/fiber";
import { OrbitControls, useTexture, useGLTF, Html, useProgress,} from "@react-three/drei";
import * as THREE from "three";

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
function SingleArtwork({ imageUrl, position, rotation, selected,}) {
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(imageUrl);
  const imageAspect = texture.image.width / texture.image.height;
  const artworkHeight = 1.6;
  const artworkWidth = artworkHeight * imageAspect;
  const frameColor = selected ? "#d4a853" : hovered ? "#8b5e3c" : "#4a2c1d";
  const frameScale = selected ? 1.08 : hovered ? 1.04 : 1;
  return (
    <group position={position} rotation={rotation} scale={frameScale}
      onPointerOver={(event) => {event.stopPropagation(); setHovered(true);}}
      onPointerOut={() => {setHovered(false);}}>
      <mesh position={[0, 0, -0.08]} castShadow>
        <boxGeometry args={[artworkWidth + 0.25,artworkHeight + 0.25,0.12,]}/>
        <meshStandardMaterial color={frameColor} roughness={0.55} metalness={0}/>
      </mesh>

      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[artworkWidth, artworkHeight]}/>
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}

function Room() {
  return (
    <group>
      <mesh position={[0, 3, 0]} receiveShadow>
        <cylinderGeometry args={[10, 10, 6, 64, 1, true]}/>
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
    <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[1, 1, 1.5, 32]}/>
      <meshStandardMaterial color="#b8b0a4" roughness={0.45} metalness={0}/>
    </mesh>
  );
}
// function Sculpture() {
//   const { scene } = useGLTF("/adjustable_leg.glb" );
//   return (
//     <primitive object={scene} position={[0, 1.5, 0]} scale={[10, 10, 10]} />
//   );
// }
function Sculpture() {
  const { scene } = useGLTF(
    "/adjustable_leg.glb"
  );

  const {model,modelScale,modelOffset,} = useMemo(() => {
    const model = scene.clone(true);
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    const box =new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    const targetHeight = 1.5;
    const modelScale =size.y > 0 ? targetHeight / size.y : 1;
    const modelOffset = [-center.x,-box.min.y,-center.z,];

    return {model,modelScale,modelOffset,};
  }, [scene]);

  return (
    <group position={[0, 1.5, 0]} scale={modelScale}>
      <group position={modelOffset}>
        <primitive object={model} />
      </group>
    </group>
  );
}
function CameraRig({ cameraMode, onArrive, selectedPhotoIndex, artworkCount,}) {
  const { camera } = useThree();
  const hasArrived = useRef(false);
  const sculptureCameraPosition =useMemo(() => new THREE.Vector3(4, 2.7, 4),[]);
  const sculptureTarget =useMemo(() => new THREE.Vector3(0, 2.25, 0),[]);
  const artworkAngle = useMemo(() => {
      if (selectedPhotoIndex < 0 || artworkCount === 0) {
        return null;
      }
      return (
        (selectedPhotoIndex / artworkCount) * Math.PI * 2
      );
    }, [selectedPhotoIndex, artworkCount]);
  const artworkTarget = useMemo(() => {
    if (artworkAngle === null) {
      return null;
    }
    const wallRadius = 9.4;
    return new THREE.Vector3(Math.sin(artworkAngle) * wallRadius,3,-Math.cos(artworkAngle) * wallRadius);
  }, [artworkAngle]);

  const artworkCameraPosition = useMemo(() => {
    if (artworkAngle === null) {
      return null;
    }
    const cameraRadius = 7;
    return new THREE.Vector3(Math.sin(artworkAngle) * cameraRadius,3,-Math.cos(artworkAngle) * cameraRadius);
  }, [artworkAngle]);
  useEffect(() => {
    hasArrived.current = false;
  }, [cameraMode, selectedPhotoIndex]);
  useFrame((_, delta) => {
    if (hasArrived.current) return;
    let cameraDestination = null;
    let lookAtPosition = null;

    if (cameraMode === "sculpture") {
      cameraDestination = sculptureCameraPosition;
      lookAtPosition = sculptureTarget;
    } else if (cameraMode === "artwork" && artworkCameraPosition !== null && artworkTarget !== null
    ) {
      cameraDestination = artworkCameraPosition;
      lookAtPosition = artworkTarget;
    } else return;

    const moveSpeed = 2.5;
    const lerpAmount = 1 - Math.exp(-moveSpeed * delta);

    camera.position.lerp(cameraDestination,lerpAmount );
    camera.lookAt(lookAtPosition);

    if (camera.position.distanceTo(cameraDestination) < 0.05) {
      hasArrived.current = true;
      if (cameraMode === "sculpture") {
        onArrive();
      }
    }
  });
  return null;
}
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
      <Canvas shadows camera={{ position: [0, 3, 0.5] }}>
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
            const radius = 9.4;
            const x = Math.sin(angle) * radius;
            const z = -Math.cos(angle) * radius;

            return (
              <SingleArtwork
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
          artworkCount={visiblePhotos.length}/>
        <OrbitControls
          enabled={
            cameraMode === "gallery" || (cameraMode === "sculpture" && isOrbiting)
          }
          target={[0, 2.25, 0]}
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
