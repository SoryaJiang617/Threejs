import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const useRenderer = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setClearColor(0xffffff);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const wallTexture = textureLoader.load("wall_texture.jpg");
    const cylinderTexture = textureLoader.load("cylinder_texture.png");
    const floorTexture = textureLoader.load("cylinder_texture.png");

    const ambientLight = new THREE.AmbientLight(0x404040, 5);
    scene.add(ambientLight);

    const roomWallsGeometry = new THREE.CylinderGeometry(
      10,
      10,
      10,
      64,
      1,
      true
    );
    const roomWallsMaterial = new THREE.MeshStandardMaterial({
      map: wallTexture,
      side: THREE.BackSide,
    });
    const roomWalls = new THREE.Mesh(roomWallsGeometry, roomWallsMaterial);
    roomWalls.position.set(0, 5, 0);
    roomWalls.receiveShadow = true;
    scene.add(roomWalls);

    const floorGeometry = new THREE.CircleGeometry(10, 64);
    const floorMaterial = new THREE.MeshStandardMaterial({
      map: floorTexture,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 4, 32);
    const cylinderMaterial = new THREE.MeshStandardMaterial({
      map: cylinderTexture,
    });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.set(0, 2, 0);
    cylinder.castShadow = true;
    scene.add(cylinder);

    camera.position.set(0, 5, 15);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;

    const animate = function () {
      requestAnimationFrame(animate);

      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { mountRef };
};
