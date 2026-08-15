import {useEffect,useMemo,useRef,} from "react";
import {useFrame,useThree,} from "@react-three/fiber";
import * as THREE from "three";

export default function CameraRig({ cameraMode, onArrive, selectedPhotoIndex, artworkCount, artworkRadius}) {
  const { camera } = useThree();
  const hasArrived = useRef(false);
  const sculptureCameraPosition =useMemo(() => new THREE.Vector3(4, 5, 4),[]);//4.75+any num=5
  const sculptureTarget =useMemo(() => new THREE.Vector3(0, 4.75, 0),[]);//sculpture center =4 + 1.5 / 2= 4.75
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
    return new THREE.Vector3(Math.sin(artworkAngle) * artworkRadius,3,-Math.cos(artworkAngle) * artworkRadius);// ARTWORK_RADIUS
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