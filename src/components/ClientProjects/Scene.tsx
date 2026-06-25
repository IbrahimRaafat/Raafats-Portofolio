"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Model from "./Model";

interface SceneProps {
  activeMenu: number | null;
}

export default function Scene({ activeMenu }: SceneProps) {
  return (
    <div className="fixed top-0 left-0 h-screen w-full pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas>
        <Model activeMenu={activeMenu} />
      </Canvas>
    </div>
  );
}
