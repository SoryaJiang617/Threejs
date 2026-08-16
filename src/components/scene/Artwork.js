import { useState } from "react";
import { useTexture } from "@react-three/drei";
import {
  ARTWORK_HEIGHT,
  FRAME_COLORS,
  FRAME_SCALES,
} from "../../constants/scene";

export default function Artwork({
  imageUrl,
  position,
  rotation,
  selected,
  onSelect,
}) {
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(imageUrl);

  const imageAspect = texture.image.width / texture.image.height;
  const artworkWidth = ARTWORK_HEIGHT * imageAspect;

  const frameColor = selected
    ? FRAME_COLORS.selected
    : hovered
      ? FRAME_COLORS.hovered
      : FRAME_COLORS.default;
  const frameScale = selected
    ? FRAME_SCALES.selected
    : hovered
      ? FRAME_SCALES.hovered
      : FRAME_SCALES.default;

  return (
    <group
      position={position}
      rotation={rotation}
      scale={frameScale}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => {
        setHovered(false);
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      <mesh position={[0, 0, -0.08]} castShadow>
        <boxGeometry
          args={[artworkWidth + 0.25, ARTWORK_HEIGHT + 0.25, 0.12]}
        />
        <meshStandardMaterial
          color={frameColor}
          roughness={0.55}
          metalness={0}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[artworkWidth, ARTWORK_HEIGHT]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}
