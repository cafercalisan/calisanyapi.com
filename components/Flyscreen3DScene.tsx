"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type SceneProps = { area: "window" | "door"; system: "hinged" | "sliding"; finish: string; width: number; height: number; open: boolean };

function PleatedMesh({ width, height, color }: { width: number; height: number; color: string }) {
  const geometry = useMemo(() => {
    const folds = 28;
    const positions: number[] = [];
    const indices: number[] = [];
    for (let i = 0; i <= folds; i += 1) {
      const x = (i / folds) * width;
      const z = (i % 2 === 0 ? -1 : 1) * 0.022;
      positions.push(x, 0, z, x, height, z);
      if (i < folds) {
        const base = i * 2;
        indices.push(base, base + 1, base + 3, base, base + 3, base + 2);
      }
    }
    const nextGeometry = new THREE.BufferGeometry();
    nextGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    nextGeometry.setIndex(indices);
    nextGeometry.computeVertexNormals();
    return nextGeometry;
  }, [height, width]);

  return <mesh geometry={geometry}>
    <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.72} roughness={0.86} metalness={0.05}/>
  </mesh>;
}

function FrameRails({ width, height, rail, depth, color }: { width: number; height: number; rail: number; depth: number; color: string }) {
  return <group>
    <mesh position={[-width / 2 + rail / 2, 0, 0]}><boxGeometry args={[rail, height, depth]}/><meshStandardMaterial color={color} roughness={0.28} metalness={0.58}/></mesh>
    <mesh position={[width / 2 - rail / 2, 0, 0]}><boxGeometry args={[rail, height, depth]}/><meshStandardMaterial color={color} roughness={0.28} metalness={0.58}/></mesh>
    <mesh position={[0, height / 2 - rail / 2, 0]}><boxGeometry args={[width, rail, depth]}/><meshStandardMaterial color={color} roughness={0.28} metalness={0.58}/></mesh>
    <mesh position={[0, -height / 2 + rail / 2, 0]}><boxGeometry args={[width, rail, depth]}/><meshStandardMaterial color={color} roughness={0.28} metalness={0.58}/></mesh>
  </group>;
}

function HingedPanel({ width, height, rail, depth, color, open }: SceneProps & { width: number; height: number; rail: number; depth: number; color: string }) {
  const panel = useRef<THREE.Group>(null);
  const panelWidth = width - rail * 1.6;
  const panelHeight = height - rail * 1.6;
  useFrame((_, delta) => {
    if (panel.current) panel.current.rotation.y = THREE.MathUtils.damp(panel.current.rotation.y, open ? -0.72 : 0, 4, delta);
  });

  return <group ref={panel} position={[-width / 2 + rail * 0.8, 0, depth * 0.58]}>
    <mesh position={[panelWidth / 2, 0, -0.006]}>
      <planeGeometry args={[panelWidth - rail * 1.5, panelHeight - rail * 1.5]}/>
      <meshStandardMaterial color="#71807b" transparent opacity={0.28} side={THREE.DoubleSide} roughness={0.96}/>
    </mesh>
    <group position={[panelWidth / 2, 0, 0]}><FrameRails width={panelWidth} height={panelHeight} rail={rail * 0.72} depth={depth * 0.72} color={color}/></group>
    {[ -0.48, 0, 0.48 ].map((y) => <mesh key={y} position={[rail * 0.75, y * panelHeight, depth * 0.25]}>
      <boxGeometry args={[rail * 0.28, rail * 1.35, depth * 0.35]}/><meshStandardMaterial color="#22292b" roughness={0.42} metalness={0.5}/>
    </mesh>)}
  </group>;
}

function SlidingPanel({ width, height, rail, color, open }: SceneProps & { width: number; height: number; rail: number; color: string }) {
  const panel = useRef<THREE.Group>(null);
  const panelWidth = width - rail * 1.6;
  const panelHeight = height - rail * 1.6;
  useFrame((_, delta) => {
    if (panel.current) panel.current.scale.x = THREE.MathUtils.damp(panel.current.scale.x, open ? 0.16 : 1, 4, delta);
  });

  return <group ref={panel} position={[-panelWidth / 2, -panelHeight / 2, 0.045]}>
    <PleatedMesh width={panelWidth} height={panelHeight} color="#65736f"/>
    <mesh position={[panelWidth, panelHeight / 2, 0.025]}>
      <boxGeometry args={[rail * 0.9, panelHeight, rail * 0.7]}/><meshStandardMaterial color={color} roughness={0.28} metalness={0.58}/>
    </mesh>
  </group>;
}

function ProductModel(props: SceneProps) {
  const { area, system, finish, width: widthCm, height: heightCm } = props;
  const height = area === "door" ? 2.18 : 1.72;
  const ratio = widthCm / Math.max(heightCm, 1);
  const width = THREE.MathUtils.clamp(height * ratio, 0.82, 2.48);
  const rail = 0.075;
  const depth = 0.12;
  const colors: Record<string, string> = { white: "#F1F0EA", anthracite: "#383E42", "golden-oak": "#B77A45" };
  const frameColor = colors[finish] ?? "#383E42";

  return <group position={[0, -0.05, 0]}>
    <FrameRails width={width} height={height} rail={rail} depth={depth} color={frameColor}/>
    {system === "hinged" ? <HingedPanel {...props} width={width} height={height} rail={rail} depth={depth} color={frameColor}/> : <SlidingPanel {...props} width={width} height={height} rail={rail} color={frameColor}/>}
  </group>;
}

export function Flyscreen3DScene(props: SceneProps) {
  return <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.12, 4.6], fov: 34 }} gl={{ antialias: true, alpha: true }}>
    <color attach="background" args={["#f1f2ef"]}/>
    <ambientLight intensity={1.4}/>
    <directionalLight position={[3, 4, 5]} intensity={2.4}/>
    <directionalLight position={[-4, 1, 2]} intensity={0.8} color="#b8d3d0"/>
    <ProductModel {...props}/>
    <OrbitControls enablePan={false} enableDamping dampingFactor={0.08} minDistance={2.6} maxDistance={6.5} minPolarAngle={0.35} maxPolarAngle={Math.PI - 0.35}/>
  </Canvas>;
}
