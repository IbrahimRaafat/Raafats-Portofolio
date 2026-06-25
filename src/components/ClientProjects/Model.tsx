import React, { useEffect, useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { animate, useMotionValue } from "framer-motion";
import { vertex, fragment } from "./Shader";
import { useTexture, useAspect } from "@react-three/drei";
import useMouse from "./useMouse";
import useDimension from "./useDimension";
import { projects } from "./data";

interface ShaderUniforms {
  [uniform: string]: THREE.IUniform;
  uDelta: { value: { x: number; y: number } };
  uAmplitude: { value: number };
  uTexture: { value: THREE.Texture };
  uAlpha: { value: number };
}

function useAllTextures(): THREE.Texture[] {
  const texturePaths = projects.map(p => p.src);
  const textures = useTexture(texturePaths);
  return Array.isArray(textures) ? textures : [textures];
}

function TextureLoader({ onTexturesLoaded }: { onTexturesLoaded: (textures: THREE.Texture[]) => void }) {
  const textures = useAllTextures();

  useEffect(() => {
    onTexturesLoaded(textures);
  }, [textures, onTexturesLoaded]);

  return null;
}

export default function Model({ activeMenu }: { activeMenu: number | null }) {
  const plane = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const dimension = useDimension();
  const mouse = useMouse();
  const opacity = useMotionValue(0);
  const [textures, setTextures] = React.useState<THREE.Texture[]>([]);

  const handleTexturesLoaded = React.useCallback((loadedTextures: THREE.Texture[]) => {
    setTextures(loadedTextures);
  }, []);

  const image = textures[0]?.image as { width: number; height: number } | undefined;
  const width = image?.width ?? 1;
  const height = image?.height ?? 1;
  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const scale = useAspect(width, height, 0.225);

  const smoothMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const uniforms = useMemo<ShaderUniforms>(() => ({
    uDelta: { value: { x: 0, y: 0 } },
    uAmplitude: { value: 0.0005 },
    uTexture: { value: textures[0] || new THREE.Texture() },
    uAlpha: { value: 0 },
  }), [textures]);

  useEffect(() => {
    if (activeMenu != null && plane.current && textures[activeMenu]) {
      const mat = plane.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTexture.value = textures[activeMenu];
      animate(opacity, 1, {
        duration: 0.2,
        onUpdate: (latest: number) => {
          if (plane.current) {
            const mat = plane.current.material as THREE.ShaderMaterial;
            mat.uniforms.uAlpha.value = latest;
          }
        },
      });
    } else if (plane.current) {
      animate(opacity, 0, {
        duration: 0.2,
        onUpdate: (latest: number) => {
          if (plane.current) {
            const mat = plane.current.material as THREE.ShaderMaterial;
            mat.uniforms.uAlpha.value = latest;
          }
        },
      });
    }
  }, [activeMenu, textures, opacity]);

  useFrame(() => {
    if (!plane.current) return;

    const { x: mouseX, y: mouseY } = mouse;
    const smoothX = smoothMouse.x.get();
    const smoothY = smoothMouse.y.get();

    if (Math.abs(mouseX - smoothX) > 1) {
      smoothMouse.x.set(lerp(smoothX, mouseX, 0.1));
      smoothMouse.y.set(lerp(smoothY, mouseY, 0.1));
      const mat = plane.current.material as THREE.ShaderMaterial;
      mat.uniforms.uDelta.value = {
        x: mouseX - smoothX,
        y: -1 * (mouseY - smoothY),
      };
    }

    const posX = lerp(
      plane.current.position.x,
      THREE.MathUtils.mapLinear(smoothMouse.x.get(), 0, dimension.width, -viewport.width / 2, viewport.width / 2),
      0.1
    );
    const posY = lerp(
      plane.current.position.y,
      THREE.MathUtils.mapLinear(smoothMouse.y.get(), 0, dimension.height, viewport.height / 2, -viewport.height / 2),
      0.1
    );
    plane.current.position.x = posX;
    plane.current.position.y = posY;
  });

  return (
    <>
      <TextureLoader onTexturesLoaded={handleTexturesLoaded} />
      <mesh ref={plane} scale={scale}>
        <planeGeometry args={[1, 1, 15, 15]} />
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          transparent={true}
        />
      </mesh>
    </>
  );
}
