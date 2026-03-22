"use client";

import dynamic from "next/dynamic";

const ShaderBackground = dynamic(
  () => import("@/components/canvas/ShaderBackground"),
  { ssr: false }
);

export default function ShaderBackgroundWrapper() {
  return <ShaderBackground />;
}
