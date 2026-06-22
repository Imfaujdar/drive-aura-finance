import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei";
import type { Group } from "three";

function CarModel() {
  const { scene } = useGLTF(
    "/__l5e/assets-v1/73a1fa1d-814a-40a4-961b-59a9d41637ab/tata_punch.glb"
  );
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.15 - 0.3;
    }
  });

  return (
    <group ref={group} position={[0, -0.55, 0]} scale={1.35}>
      <primitive object={scene} />
    </group>
  );
}

export default function Car3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-3xl neu-pressed">
        <span className="text-sm font-medium text-muted-foreground">
          Loading 3D experience…
        </span>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [4, 2.2, 5.5], fov: 38 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-3, 2, -3]} intensity={0.35} />
        <Suspense fallback={null}>
          <CarModel />
          <ContactShadows
            position={[0, -1.15, 0]}
            opacity={0.35}
            scale={10}
            blur={2.5}
          />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.2}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 3}
          maxAzimuthAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
