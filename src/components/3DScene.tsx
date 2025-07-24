import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

// Character Component
const Character = () => {
  const characterRef = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (characterRef.current) {
      // Gentle floating animation
      characterRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }

    if (armRef.current) {
      // Waving arm animation
      armRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }

    if (headRef.current) {
      // Slight head bob
      headRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });

  return (
    <group ref={characterRef} position={[0, 0, 0]}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>

      {/* Hat */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.1, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.1, 1.25, 0.25]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.1, 1.25, 0.25]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, 1.15, 0.25]}>
        <torusGeometry args={[0.08, 0.02, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.4, 0.8, 0.3]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Arms */}
      <group ref={armRef} position={[0.3, 0.7, 0]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>
        {/* Hand with peace sign */}
        <group position={[0, -0.2, 0]}>
          <mesh position={[0, 0, 0.05]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#ffdbac" />
          </mesh>
          {/* Peace sign fingers */}
          <mesh position={[0.02, 0.02, 0.1]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.01, 0.01, 0.08, 4]} />
            <meshStandardMaterial color="#ffdbac" />
          </mesh>
          <mesh position={[-0.02, 0.02, 0.1]} rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.01, 0.01, 0.08, 4]} />
            <meshStandardMaterial color="#ffdbac" />
          </mesh>
        </group>
      </group>

      {/* Left Arm */}
      <mesh position={[-0.3, 0.7, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.1, 0.1, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>
      <mesh position={[0.1, 0.1, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>

      {/* Shoes */}
      <mesh position={[-0.1, -0.2, 0.1]}>
        <boxGeometry args={[0.15, 0.08, 0.25]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.1, -0.2, 0.1]}>
        <boxGeometry args={[0.15, 0.08, 0.25]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

// Desk Component
const Desk = () => {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Desk Surface */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color="#87CEEB" />
      </mesh>

      {/* Desk Legs */}
      <mesh position={[-0.8, 0, 0]}>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshStandardMaterial color="#696969" />
      </mesh>
      <mesh position={[0.8, 0, 0]}>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshStandardMaterial color="#696969" />
      </mesh>
    </group>
  );
};

// Monitor Component
const Monitor = () => {
  const monitorRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (monitorRef.current) {
      // Gentle monitor sway
      monitorRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }

    if (screenRef.current) {
      // Screen glow effect
      const intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      (
        screenRef.current.material as THREE.MeshStandardMaterial
      ).emissiveIntensity = intensity;
    }
  });

  return (
    <group ref={monitorRef} position={[-0.6, 0.5, 0]}>
      {/* Monitor Stand */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
        <meshStandardMaterial color="#696969" />
      </mesh>

      {/* Monitor Screen */}
      <mesh ref={screenRef} position={[0, 0.2, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.1]} />
        <meshStandardMaterial
          color="#87CEEB"
          emissive="#4A90E2"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Monitor Frame */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.9, 0.7, 0.05]} />
        <meshStandardMaterial color="#2F4F4F" />
      </mesh>

      {/* Sticky Note */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0.3, 0.4, 0.1]}>
          <boxGeometry args={[0.15, 0.15, 0.01]} />
          <meshStandardMaterial color="#FFFFE0" />
        </mesh>
      </Float>
    </group>
  );
};

// Laptop Component
const Laptop = () => {
  const laptopRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (laptopRef.current) {
      // Laptop floating animation
      laptopRef.current.position.y =
        0.3 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });

  return (
    <group ref={laptopRef} position={[0.6, 0.3, 0]}>
      {/* Laptop Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.05, 0.4]} />
        <meshStandardMaterial color="#DC143C" />
      </mesh>

      {/* Laptop Screen */}
      <mesh position={[0, 0.2, -0.15]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[0.6, 0.05, 0.4]} />
        <meshStandardMaterial color="#DC143C" />
      </mesh>

      {/* Screen Display */}
      <mesh position={[0, 0.2, -0.15]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[0.55, 0.01, 0.35]} />
        <meshStandardMaterial
          color="#87CEEB"
          emissive="#4A90E2"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Stickers */}
      <mesh position={[0.1, 0.25, -0.1]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[0.08, 0.01, 0.08]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      <mesh position={[-0.1, 0.25, -0.1]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[0.06, 0.01, 0.06]} />
        <meshStandardMaterial color="#FF6347" />
      </mesh>
    </group>
  );
};

// Plant Component
const Plant = () => {
  const plantRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (plantRef.current) {
      // Plant swaying animation
      plantRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group ref={plantRef} position={[-1.2, -0.2, 0]}>
      {/* Pot */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 0.2, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Plant */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      {/* Plant details */}
      <mesh position={[0.05, 0.3, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#32CD32" />
      </mesh>
      <mesh position={[-0.05, 0.25, 0.05]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
};

// Floating Papers
const FloatingPapers = () => {
  return (
    <group>
      <Float speed={1} rotationIntensity={1} floatIntensity={0.5}>
        <mesh position={[0.3, 0.1, 0.2]} rotation={[0, 0, Math.PI / 8]}>
          <boxGeometry args={[0.1, 0.15, 0.01]} />
          <meshStandardMaterial color="#FFFFE0" />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.3}>
        <mesh position={[-0.4, 0.05, 0.15]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.08, 0.12, 0.01]} />
          <meshStandardMaterial color="#F0F8FF" />
        </mesh>
      </Float>
    </group>
  );
};

// Main 3D Scene Component
const Scene3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 3], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
        performance={{ min: 0.5 }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#4A90E2" />

        {/* 3D Objects */}
        <Character />
        <Desk />
        <Monitor />
        <Laptop />
        <Plant />
        <FloatingPapers />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
