"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import GradientMesh from "./GradientMesh";

export default function ShaderBackground() {
  const [dpr, setDpr] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setDpr(Math.min(window.devicePixelRatio, mobile ? 1 : 1.5));
  }, []);

  // CSS fallback for mobile or reduced motion
  if (isMobile) {
    return (
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, #faf7f4 0%, #f0ebe5 40%, #e8e1d9 70%, #ddd5cb 100%)",
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        dpr={dpr}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "low-power",
        }}
        camera={undefined}
        style={{ width: "100%", height: "100%" }}
      >
        <GradientMesh />
      </Canvas>
    </div>
  );
}
