"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type SceneProps = { area: "window" | "door"; system: "hinged" | "sliding"; finish: string; width: number; height: number; open: boolean };

function makeMeshTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d")!;
  context.clearRect(0, 0, 256, 256);
  context.strokeStyle = "rgba(24,31,31,.62)";
  context.lineWidth = 1;
  for (let i = 0; i <= 256; i += 8) {
    context.beginPath(); context.moveTo(i, 0); context.lineTo(i, 256); context.stroke();
    context.beginPath(); context.moveTo(0, i); context.lineTo(256, i); context.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function makeOakTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128; canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  const base = ctx.createLinearGradient(0, 0, 128, 0);
  base.addColorStop(0, "#9b6539"); base.addColorStop(.25, "#d1a16b"); base.addColorStop(.52, "#b77c48"); base.addColorStop(.78, "#d9ae78"); base.addColorStop(1, "#a66d3c");
  ctx.fillStyle = base; ctx.fillRect(0, 0, 128, 512);
  for (let i = 0; i < 70; i += 1) {
    const x = Math.random() * 128;
    ctx.strokeStyle = i % 3 ? "rgba(83,47,25,.12)" : "rgba(250,218,166,.18)";
    ctx.lineWidth = Math.random() * 1.5 + .3;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.bezierCurveTo(x - 12, 150, x + 15, 330, x + (Math.random() - .5) * 10, 512); ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 8;
  return texture;
}

function ProfileMaterial({ finish, color }: { finish: string; color: string }) {
  const oak = useMemo(() => makeOakTexture(), []);
  return <meshStandardMaterial color={finish === "golden-oak" ? "#ffffff" : color} map={finish === "golden-oak" ? oak : null} roughness={finish === "white" ? .35 : .3} metalness={finish === "white" ? .18 : .27} />;
}

function Rail({ position, size, finish, color }: { position: [number, number, number]; size: [number, number, number]; finish: string; color: string }) {
  return <mesh position={position} castShadow receiveShadow><boxGeometry args={size}/><ProfileMaterial finish={finish} color={color}/></mesh>;
}

function Frame({ width, height, rail, depth, finish, color }: { width: number; height: number; rail: number; depth: number; finish: string; color: string }) {
  return <group>
    <Rail position={[-width / 2 + rail / 2, 0, 0]} size={[rail, height, depth]} finish={finish} color={color}/>
    <Rail position={[width / 2 - rail / 2, 0, 0]} size={[rail, height, depth]} finish={finish} color={color}/>
    <Rail position={[0, height / 2 - rail / 2, 0]} size={[width - rail, rail, depth]} finish={finish} color={color}/>
    <Rail position={[0, -height / 2 + rail / 2, 0]} size={[width - rail, rail, depth]} finish={finish} color={color}/>
  </group>;
}

function MeshField({ width, height, z, texture }: { width: number; height: number; z: number; texture: THREE.Texture }) {
  return <mesh position={[width / 2, 0, z]}>
    <planeGeometry args={[width, height, 1, 1]}/>
    <meshBasicMaterial map={texture} color="#c6ceca" transparent opacity={.74} side={THREE.DoubleSide} depthWrite={false}/>
  </mesh>;
}

function Hinge({ x, y, z, color, leafWidth, pinLength }: { x: number; y: number; z: number; color: string; leafWidth: number; pinLength: number }) {
  return <group position={[x, y, z]}>
    {/* Twin mounting leaves and the vertical knuckle pin of a compact screen-door hinge. */}
    <mesh position={[-leafWidth * .42, 0, 0]} castShadow><boxGeometry args={[leafWidth, .085, .025]}/><meshStandardMaterial color={color} roughness={.55}/></mesh>
    <mesh position={[leafWidth * .42, 0, 0]} castShadow><boxGeometry args={[leafWidth, .085, .025]}/><meshStandardMaterial color={color} roughness={.55}/></mesh>
    <mesh position={[0, 0, .018]} castShadow><cylinderGeometry args={[.025, .025, pinLength, 20]}/><meshStandardMaterial color={color} roughness={.38}/></mesh>
    {[-.023, .023].map((dy) => <mesh key={dy} position={[0, dy, .019]}><cylinderGeometry args={[.031, .031, .009, 20]}/><meshStandardMaterial color={color} roughness={.42}/></mesh>)}
    {[-1, 1].map((side) => <mesh key={side} position={[side * leafWidth * .63, 0, .016]}><cylinderGeometry args={[.008, .008, .014, 12]}/><meshStandardMaterial color="#7b8080" metalness={.6} roughness={.3}/></mesh>)}
  </group>;
}

function PullHandle({ x, y, z, color }: { x: number; y: number; z: number; color: string }) {
  const material = <meshStandardMaterial color={color} roughness={.42} metalness={.08}/>;
  return <group position={[x, y, z]}>
    <mesh castShadow><boxGeometry args={[.058, .19, .025]}/>{material}</mesh>
    {[-.052, .052].map((dy) => <mesh key={dy} position={[0, dy, .046]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[.012, .012, .07, 14]}/>{material}</mesh>)}
    <mesh position={[0, 0, .078]} castShadow><boxGeometry args={[.032, .13, .018]}/>{material}</mesh>
    <mesh position={[0, -.13, .02]}><cylinderGeometry args={[.008, .008, .012, 12]}/><meshStandardMaterial color="#747a7b" metalness={.65} roughness={.3}/></mesh>
  </group>;
}

function MagneticCatch({ position, color }: { position: [number, number, number]; color: string }) {
  return <group position={position}>
    <mesh castShadow><boxGeometry args={[.11, .075, .045]}/><meshStandardMaterial color={color} roughness={.46}/></mesh>
    <mesh position={[0, 0, .026]}><boxGeometry args={[.07, .04, .008]}/><meshStandardMaterial color="#b7b9b4" metalness={.55} roughness={.3}/></mesh>
  </group>;
}

function HingedPanel({ width, height, rail, depth, finish, color, open, texture }: SceneProps & { width: number; height: number; rail: number; depth: number; color: string; texture: THREE.Texture }) {
  const panel = useRef<THREE.Group>(null);
  const panelWidth = width - rail * 1.35;
  const panelHeight = height - rail * 1.3;
  useFrame((_, delta) => {
    if (panel.current) panel.current.rotation.y = THREE.MathUtils.damp(panel.current.rotation.y, open ? -.82 : 0, 3.2, delta);
  });
  const hardware = finish === "white" ? "#f5f4ed" : finish === "golden-oak" ? "#d6d4cd" : "#303539";
  return <group ref={panel} position={[-width / 2 + rail * .68, 0, depth * .5]}>
    <group position={[panelWidth / 2, 0, 0]}>
      <MeshField width={panelWidth - rail} height={panelHeight - rail} z={-.028} texture={texture}/>
      <Frame width={panelWidth} height={panelHeight} rail={rail * .82} depth={depth * .68} finish={finish} color={color}/>
      {/* Two full, articulated hinge assemblies, positioned near the ends of the hinge stile. */}
      <Hinge x={-panelWidth / 2 + rail * .2} y={panelHeight * .31} z={depth * .5} color={hardware} leafWidth={rail * .62} pinLength={rail * .82}/>
      <Hinge x={-panelWidth / 2 + rail * .2} y={-panelHeight * .31} z={depth * .5} color={hardware} leafWidth={rail * .62} pinLength={rail * .82}/>
      {/* One hand-sized pull on the stile opposite the hinges. */}
      <PullHandle x={panelWidth / 2 - rail * .5} y={0} z={depth * .48} color={hardware}/>
    </group>
  </group>;
}

function PleatedMesh({ width, height, color }: { width: number; height: number; color: string }) {
  const geometry = useMemo(() => {
    const folds = 34; const positions: number[] = []; const indices: number[] = [];
    for (let i = 0; i <= folds; i += 1) {
      const x = (i / folds) * width; const z = (i % 2 === 0 ? -.024 : .024);
      positions.push(x, 0, z, x, height, z);
      if (i < folds) { const base = i * 2; indices.push(base, base + 1, base + 3, base, base + 3, base + 2); }
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3)); geo.setIndex(indices); geo.computeVertexNormals(); return geo;
  }, [height, width]);
  return <mesh geometry={geometry}><meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={.68} roughness={.9} metalness={.02}/></mesh>;
}

function SlidingPanel({ width, height, rail, color, finish, open }: SceneProps & { width: number; height: number; rail: number; color: string }) {
  const panel = useRef<THREE.Group>(null); const panelWidth = width - rail * 1.5; const panelHeight = height - rail * 1.5;
  useFrame((_, delta) => { if (panel.current) panel.current.scale.x = THREE.MathUtils.damp(panel.current.scale.x, open ? .16 : 1, 4, delta); });
  return <group ref={panel} position={[-panelWidth / 2, -panelHeight / 2, .045]}>
    <PleatedMesh width={panelWidth} height={panelHeight} color="#3c4443"/>
    <Rail position={[panelWidth - rail / 2, panelHeight / 2, .025]} size={[rail, panelHeight, rail * .7]} finish={finish} color={color}/>
  </group>;
}

function ProductModel(props: SceneProps) {
  const { area, system, finish, width: widthCm, height: heightCm } = props;
  const height = area === "door" ? 2.18 : 1.72;
  const ratio = widthCm / Math.max(heightCm, 1);
  const width = THREE.MathUtils.clamp(height * ratio, .82, 2.48);
  const rail = .074; const depth = .12;
  const colors: Record<string, string> = { white: "#f4f3ed", anthracite: "#383e42", "golden-oak": "#b77a45" };
  const frameColor = colors[finish] ?? colors.anthracite;
  const meshTexture = useMemo(() => makeMeshTexture(), []);
  const jambColor = "#dedfd9";
  return <group position={[0, -.05, 0]}>
    {/* Installed surround, shown as a neutral jamb so the product hardware reads clearly. */}
    {system === "hinged" && <group position={[0, 0, -.095]}>
      <Frame width={width + .07} height={height + .07} rail={.045} depth={.07} finish="white" color={jambColor}/>
    </group>}
    <Frame width={width} height={height} rail={rail} depth={depth} finish={finish} color={frameColor}/>
    {system === "hinged" ? <>
      <HingedPanel {...props} width={width} height={height} rail={rail} depth={depth} color={frameColor} texture={meshTexture}/>
      <MagneticCatch position={[width / 2 - .02, 0, depth * .65]} color={finish === "white" ? "#f4f3ed" : "#363c3e"}/>
    </> : <SlidingPanel {...props} width={width} height={height} rail={rail} color={frameColor} finish={finish}/>}
  </group>;
}

export function Flyscreen3DScene(props: SceneProps) {
  return <Canvas dpr={[1, 1.5]} shadows camera={{ position: [0, .1, 4.5], fov: 34 }} gl={{ antialias: true, alpha: true }}>
    <color attach="background" args={["#f1f2ef"]}/>
    <ambientLight intensity={1.25}/>
    <directionalLight position={[3, 4, 5]} intensity={2.2} castShadow/>
    <directionalLight position={[-4, 1, 2]} intensity={.75} color="#b8d3d0"/>
    <ProductModel {...props}/>
    <OrbitControls enablePan={false} enableDamping dampingFactor={.08} minDistance={2.6} maxDistance={6.5} minPolarAngle={.35} maxPolarAngle={Math.PI - .35}/>
  </Canvas>;
}
