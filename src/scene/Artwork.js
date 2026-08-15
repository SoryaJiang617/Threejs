import { useState } from "react";
import { useTexture } from "@react-three/drei";

export default function Artwork({ imageUrl, position, rotation, selected,}) {
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