"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import vertexShader from "./shaders/gradient.vert";
import fragmentShader from "./shaders/gradient.frag";

// PANTONE 11-4201 Cloud Dancer palette
const COLORS = {
  color1: new THREE.Color("#f0eae1"), // Cloud Dancer
  color2: new THREE.Color("#e6dfd6"), // warm cream
  color3: new THREE.Color("#ddd5cb"), // light sand
  color4: new THREE.Color("#d4cbc0"), // soft taupe
};

export default function GradientMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_color1: { value: COLORS.color1 },
      u_color2: { value: COLORS.color2 },
      u_color3: { value: COLORS.color3 },
      u_color4: { value: COLORS.color4 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Update at ~30fps by skipping frames
  const frameCount = useRef(0);
  useFrame((_, delta) => {
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return;

    uniforms.u_time.value += delta;
    uniforms.u_resolution.value.set(size.width, size.height);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
