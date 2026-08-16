import {useEffect,useMemo,useRef,} from "react";
import {useFrame,useThree,} from "@react-three/fiber";
import * as THREE from "three";
import {SCULPTURE_CENTER_Y,ARTWORK_CAMERA_RADIUS,ARTWORK_CENTER_Y,CAMERA_ARRIVAL_THRESHOLD,CAMERA_MOVE_SPEED,GALLERY_CAMERA_POSITION,SCULPTURE_CAMERA_POSITION,} from "../../constants/scene";

export default function CameraRig({ cameraMode, onArrive, selectedPhotoIndex, artworkCount, artworkRadius}) {
  const { camera } = useThree();
  const hasArrived = useRef(false);
  const sculptureCameraPosition =useMemo(() => new THREE.Vector3(...SCULPTURE_CAMERA_POSITION),[]);//4.75+any num=5
  const sculptureTarget =useMemo(() => new THREE.Vector3(0, SCULPTURE_CENTER_Y, 0),[]);//sculpture center =4 + 1.5 / 2= 4.75

  const galleryCameraPosition = useMemo(() => new THREE.Vector3(...GALLERY_CAMERA_POSITION),[]);
  const galleryTarget = useMemo(() => new THREE.Vector3(0, ARTWORK_CENTER_Y, 0),[]);

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
  }, [artworkAngle, artworkRadius]);

  const artworkCameraPosition = useMemo(() => {
    if (artworkAngle === null) {
      return null;
    }

    return new THREE.Vector3(Math.sin(artworkAngle) * ARTWORK_CAMERA_RADIUS,ARTWORK_CENTER_Y,-Math.cos(artworkAngle) * ARTWORK_CAMERA_RADIUS);
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
    } else if (cameraMode === "gallery") {
      cameraDestination = galleryCameraPosition;
      lookAtPosition = galleryTarget;
    } else return;

    const lerpAmount = 1 - Math.exp(-CAMERA_MOVE_SPEED * delta);

    camera.position.lerp(cameraDestination,lerpAmount );
    camera.lookAt(lookAtPosition);

    if (camera.position.distanceTo(cameraDestination) < CAMERA_ARRIVAL_THRESHOLD) {
      hasArrived.current = true;
      if (cameraMode === "sculpture") {
        onArrive();
      }
    }
  });
  return null;
}