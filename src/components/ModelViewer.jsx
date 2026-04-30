import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Center, BakeShadows } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function CameraAdjust() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 1, 3);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

function Model({ url }) {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

function ModelViewer({ url }) {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Canvas>
        <CameraAdjust />
        <Environment preset="studio" />
        <Suspense fallback={null}>
          <Model url={url} />
        </Suspense>
        <OrbitControls target={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default ModelViewer;