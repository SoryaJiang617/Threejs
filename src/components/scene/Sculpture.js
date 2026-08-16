import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import {SCULPTURE_BASE_Y,SCULPTURE_DISPLAY_HEIGHT,} from "../../constants/scene";

export default function Sculpture() {
  const { scene } = useGLTF("/adjustable_leg.glb");

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

    const modelScale =size.y > 0 ? SCULPTURE_DISPLAY_HEIGHT / size.y : 1;
    const modelOffset = [-center.x,-box.min.y,-center.z,];

    return {model,modelScale,modelOffset,};
  }, [scene]);

  return (
    <group position={[0, SCULPTURE_BASE_Y, 0]} scale={modelScale}>
      <group position={modelOffset}>
        <primitive object={model} />
      </group>
    </group>
  );
}
