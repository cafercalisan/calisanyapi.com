"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type SceneProps = { area: "window" | "door"; system: "hinged" | "sliding"; finish: string; width: number; height: number; open: boolean; progress: number; onProgressChange: (value: number) => void; installed: boolean; mountAnimationKey: number };

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
  base.addColorStop(0, "#a9632f"); base.addColorStop(.25, "#e0ad68"); base.addColorStop(.52, "#bc7838"); base.addColorStop(.78, "#edc487"); base.addColorStop(1, "#a9612e");
  ctx.fillStyle = base; ctx.fillRect(0, 0, 128, 512);
  for (let i = 0; i < 70; i += 1) {
    const x = Math.random() * 128;
    ctx.strokeStyle = i % 3 ? "rgba(83,47,25,.23)" : "rgba(255,226,174,.3)";
    ctx.lineWidth = Math.random() * 1.5 + .3;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.bezierCurveTo(x - 12, 150, x + 15, 330, x + (Math.random() - .5) * 10, 512); ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 8;
  return texture;
}

let sharedOakTexture: THREE.Texture | null = null;

function ProfileMaterial({ finish, color }: { finish: string; color: string }) {
  const oak = useMemo(() => {
    if (finish !== "golden-oak") return null;
    sharedOakTexture ??= makeOakTexture();
    return sharedOakTexture;
  }, [finish]);
  return <meshStandardMaterial color={finish === "golden-oak" ? "#f4bf78" : color} map={finish === "golden-oak" ? oak : null} roughness={finish === "white" ? .35 : finish === "golden-oak" ? .58 : .3} metalness={finish === "white" ? .18 : finish === "golden-oak" ? .02 : .27} />;
}

function Rail({ position, size, finish, color }: { position: [number, number, number]; size: [number, number, number]; finish: string; color: string }) {
  const [xSize, ySize, depth] = size;
  const horizontal = xSize >= ySize;
  const length = horizontal ? xSize : ySize;
  const face = horizontal ? ySize : xSize;
  const wall = .002;
  return <group position={position}>
    {/* Hollow extruded aluminium section, based on the open profile ends in the supplied photo. */}
    {horizontal ? <>
      <mesh position={[0, 0, depth / 2 - wall / 2]} castShadow receiveShadow><boxGeometry args={[length, face - wall * 2, wall]}/><ProfileMaterial finish={finish} color={color}/></mesh>
      <mesh position={[0, 0, -depth / 2 + wall / 2]} castShadow receiveShadow><boxGeometry args={[length, face - wall * 2, wall]}/><ProfileMaterial finish={finish} color={color}/></mesh>
      {[-1, 1].map((side) => <mesh key={side} position={[0, side * (face / 2 - wall / 2), 0]} castShadow receiveShadow><boxGeometry args={[length, wall, depth - wall * 2]}/><ProfileMaterial finish={finish} color={color}/></mesh>)}
    </> : <>
      <mesh position={[0, 0, depth / 2 - wall / 2]} castShadow receiveShadow><boxGeometry args={[face - wall * 2, length, wall]}/><ProfileMaterial finish={finish} color={color}/></mesh>
      <mesh position={[0, 0, -depth / 2 + wall / 2]} castShadow receiveShadow><boxGeometry args={[face - wall * 2, length, wall]}/><ProfileMaterial finish={finish} color={color}/></mesh>
      {[-1, 1].map((side) => <mesh key={side} position={[side * (face / 2 - wall / 2), 0, 0]} castShadow receiveShadow><boxGeometry args={[wall, length, depth - wall * 2]}/><ProfileMaterial finish={finish} color={color}/></mesh>)}
    </>}
  </group>;
}

function CornerJoint({ x, y, rail, depth, finish }: { x: number; y: number; rail: number; depth: number; finish: string }) {
  const plate = finish === "white" ? "#e6e3d9" : finish === "anthracite" ? "#17191b" : "#463528";
  const hole = finish === "white" ? "#777971" : "#080909";
  const leg = .032;
  const faceZ = depth / 2 + .0015;
  const holeDisc = (px: number, py: number, key: string) => <mesh key={key} position={[px, py, faceZ + .002]} rotation={[Math.PI / 2, 0, 0]}>
    <cylinderGeometry args={[.0042, .0042, .003, 20]}/><meshStandardMaterial color={hole} roughness={.62}/>
  </mesh>;
  return <group position={[x, y, 0]}>
    {/* Moulded L corner from the supplied accessory photo; the two bores remain visible. */}
    <mesh position={[-Math.sign(x) * leg / 2, -Math.sign(y) * rail * .08, faceZ]} castShadow><boxGeometry args={[leg, Math.min(.019, rail * .7), .006]}/><meshStandardMaterial color={plate} roughness={.74}/></mesh>
    <mesh position={[-Math.sign(x) * rail * .08, -Math.sign(y) * leg / 2, faceZ]} castShadow><boxGeometry args={[Math.min(.019, rail * .7), leg, .006]}/><meshStandardMaterial color={plate} roughness={.74}/></mesh>
    {holeDisc(-Math.sign(x) * leg * .68, -Math.sign(y) * rail * .16, "h1")}
    {holeDisc(-Math.sign(x) * rail * .16, -Math.sign(y) * leg * .68, "h2")}
  </group>;
}

function Frame({ width, height, rail, depth, finish, color, showJoints = true }: { width: number; height: number; rail: number; depth: number; finish: string; color: string; showJoints?: boolean }) {
  return <group>
    <Rail position={[-width / 2 + rail / 2, 0, 0]} size={[rail, height, depth]} finish={finish} color={color}/>
    <Rail position={[width / 2 - rail / 2, 0, 0]} size={[rail, height, depth]} finish={finish} color={color}/>
    <Rail position={[0, height / 2 - rail / 2, 0]} size={[width - rail, rail, depth]} finish={finish} color={color}/>
    <Rail position={[0, -height / 2 + rail / 2, 0]} size={[width - rail, rail, depth]} finish={finish} color={color}/>
    {showJoints && [
      [-width / 2 + rail / 2, height / 2 - rail / 2],
      [width / 2 - rail / 2, height / 2 - rail / 2],
      [-width / 2 + rail / 2, -height / 2 + rail / 2],
      [width / 2 - rail / 2, -height / 2 + rail / 2],
    ].map(([x, y], index) => <CornerJoint key={index} x={x} y={y} rail={rail} depth={depth} finish={finish}/>) }
  </group>;
}

function Hinge({ x, y, z, color, leafWidth, pinLength }: { x: number; y: number; z: number; color: string; leafWidth: number; pinLength: number }) {
  return <group position={[x, y, z]}>
    {/* Twin mounting leaves and the vertical knuckle pin of a compact screen-door hinge. */}
    <mesh position={[-leafWidth * .42, 0, 0]} castShadow><boxGeometry args={[leafWidth, .055, .004]}/><meshStandardMaterial color={color} roughness={.55}/></mesh>
    <mesh position={[leafWidth * .42, 0, 0]} castShadow><boxGeometry args={[leafWidth, .055, .004]}/><meshStandardMaterial color={color} roughness={.55}/></mesh>
    <mesh position={[0, 0, .004]} castShadow><cylinderGeometry args={[.006, .006, pinLength, 20]}/><meshStandardMaterial color={color} roughness={.38}/></mesh>
    {[-.023, .023].map((dy) => <mesh key={dy} position={[0, dy, .004]}><cylinderGeometry args={[.008, .008, .005, 20]}/><meshStandardMaterial color={color} roughness={.42}/></mesh>)}
    {[-1, 1].map((side) => <mesh key={side} position={[side * leafWidth * .63, 0, .004]}><cylinderGeometry args={[.0024, .0024, .003, 12]}/><meshStandardMaterial color="#7b8080" metalness={.6} roughness={.3}/></mesh>)}
  </group>;
}

function PullHandle({ x, y, z, color }: { x: number; y: number; z: number; color: string }) {
  const material = <meshStandardMaterial color={color} roughness={.42} metalness={.08}/>;
  return <group position={[x, y, z]}>
    <mesh castShadow><boxGeometry args={[.035, .11, .006]}/>{material}</mesh>
    {[-.035, .035].map((dy) => <mesh key={dy} position={[0, dy, .018]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[.004, .004, .025, 14]}/>{material}</mesh>)}
    <mesh position={[0, 0, .03]} castShadow><boxGeometry args={[.018, .08, .008]}/>{material}</mesh>
    <mesh position={[0, -.045, .005]}><cylinderGeometry args={[.002, .002, .003, 12]}/><meshStandardMaterial color="#747a7b" metalness={.65} roughness={.3}/></mesh>
  </group>;
}

function MagneticCatch({ position, color }: { position: [number, number, number]; color: string }) {
  return <group position={position}>
    <mesh castShadow><boxGeometry args={[.045, .035, .012]}/><meshStandardMaterial color={color} roughness={.46}/></mesh>
    <mesh position={[0, 0, .008]}><boxGeometry args={[.028, .018, .003]}/><meshStandardMaterial color="#b7b9b4" metalness={.55} roughness={.3}/></mesh>
  </group>;
}

function OpenWindowSash({ width, height }: { width: number; height: number }) {
  const sashWidth = width - .14;
  const sashHeight = height - .14;
  const profile = "#f5f4ee";
  return <group position={[-width / 2, 0, .025]} rotation={[0, .62, 0]}>
    {/* Casement leaf is hinged on the left and shown swung open behind the screen. */}
    <group position={[sashWidth / 2, 0, 0]}>
      <mesh position={[0, 0, -.004]}><planeGeometry args={[sashWidth - .085, sashHeight - .085]}/><meshPhysicalMaterial color="#bed2d1" transparent opacity={.24} roughness={.12} metalness={.04} side={THREE.DoubleSide} depthWrite={false}/></mesh>
      <mesh position={[-sashWidth / 2 + .023, 0, 0]} castShadow><boxGeometry args={[.046, sashHeight, .055]}/><meshStandardMaterial color={profile} roughness={.38}/></mesh>
      <mesh position={[sashWidth / 2 - .023, 0, 0]} castShadow><boxGeometry args={[.046, sashHeight, .055]}/><meshStandardMaterial color={profile} roughness={.38}/></mesh>
      <mesh position={[0, sashHeight / 2 - .023, 0]} castShadow><boxGeometry args={[sashWidth - .046, .046, .055]}/><meshStandardMaterial color={profile} roughness={.38}/></mesh>
      <mesh position={[0, -sashHeight / 2 + .023, 0]} castShadow><boxGeometry args={[sashWidth - .046, .046, .055]}/><meshStandardMaterial color={profile} roughness={.38}/></mesh>
      <mesh position={[sashWidth / 2 - .052, 0, .034]} castShadow><boxGeometry args={[.012, .105, .012]}/><meshStandardMaterial color="#59605e" roughness={.45}/></mesh>
    </group>
    {[height * .29, -height * .29].map((y) => <mesh key={y} position={[.006, y, 0]}><cylinderGeometry args={[.007, .007, .05, 16]}/><meshStandardMaterial color="#aeb4b1" metalness={.4} roughness={.42}/></mesh>)}
  </group>;
}

function MountingScrews({ width, height, rail, surfaceZ, trigger }: { width: number; height: number; rail: number; surfaceZ: number; trigger: number }) {
  const screws = useRef<(THREE.Group | null)[]>([]);
  const animationStart = useRef<number | null>(null);
  useEffect(() => { animationStart.current = null; }, [trigger]);
  useFrame(({ clock }) => {
    if (trigger < 1) return;
    if (animationStart.current === null) animationStart.current = clock.elapsedTime;
    const elapsed = clock.elapsedTime - animationStart.current;
    screws.current.forEach((screw, index) => {
      if (!screw) return;
      const amount = THREE.MathUtils.clamp((elapsed - index * .3) / .65, 0, 1);
      screw.visible = true;
      screw.position.z = surfaceZ + .13 - amount * .122;
    });
  });
  const corners: [number, number][] = [
    [-width / 2 + rail / 2, height / 2 - rail / 2],
    [width / 2 - rail / 2, height / 2 - rail / 2],
    [-width / 2 + rail / 2, -height / 2 + rail / 2],
    [width / 2 - rail / 2, -height / 2 + rail / 2],
  ].map(([x, y]) => [x - Math.sign(x) * .032 * .68, y - Math.sign(y) * rail * .16]);
  return <group>{corners.map(([x, y], index) => <group key={index} ref={(node) => { screws.current[index] = node; }} position={[x, y, surfaceZ + .13]} visible={false}>
    <mesh position={[0, 0, -.005]} rotation={[-Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[.0026, .0026, .026, 14]}/><meshStandardMaterial color="#aeb4b2" metalness={.72} roughness={.3}/></mesh>
    <mesh position={[0, 0, .008]} rotation={[-Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[.006, .006, .004, 18]}/><meshStandardMaterial color="#c6cbc8" metalness={.7} roughness={.28}/></mesh>
    <mesh position={[0, 0, .0102]}><boxGeometry args={[.0065, .0011, .001]}/><meshStandardMaterial color="#515756" roughness={.55}/></mesh>
    <mesh position={[0, 0, .0103]} rotation={[0, 0, Math.PI / 2]}><boxGeometry args={[.0065, .0011, .001]}/><meshStandardMaterial color="#515756" roughness={.55}/></mesh>
  </group>)}</group>;
}

function HingedPanel({ width, height, rail, depth, finish, color, open, texture }: SceneProps & { width: number; height: number; rail: number; depth: number; color: string; texture: THREE.Texture }) {
  const panel = useRef<THREE.Group>(null);
  const panelWidth = width;
  const panelHeight = height;
  const frameRail = rail;
  useFrame((_, delta) => {
    if (panel.current) panel.current.rotation.y = THREE.MathUtils.damp(panel.current.rotation.y, open ? -.82 : 0, 3.2, delta);
  });
  const hardware = finish === "white" ? "#f5f4ed" : finish === "golden-oak" ? "#d6d4cd" : "#303539";
  return <group ref={panel} position={[-width / 2, 0, depth * .5]}>
    <group position={[panelWidth / 2, 0, 0]}>
      <PleatedMesh width={panelWidth - frameRail * 2} height={panelHeight - frameRail * 2} z={0} color="#74807d" texture={texture}/>
      <Frame width={panelWidth} height={panelHeight} rail={frameRail} depth={depth} finish={finish} color={color}/>
      {/* Two full, articulated hinge assemblies, positioned near the ends of the hinge stile. */}
      <Hinge x={-panelWidth / 2 + frameRail * .2} y={panelHeight * .31} z={depth * .5} color={hardware} leafWidth={frameRail * .62} pinLength={.055}/>
      <Hinge x={-panelWidth / 2 + frameRail * .2} y={-panelHeight * .31} z={depth * .5} color={hardware} leafWidth={frameRail * .62} pinLength={.055}/>
      {/* One hand-sized pull on the stile opposite the hinges. */}
      <PullHandle x={panelWidth / 2 - frameRail * .5} y={0} z={depth * .5} color={hardware}/>
    </group>
  </group>;
}

function PleatedMesh({ width, height, z, color, texture }: { width: number; height: number; z: number; color: string; texture: THREE.Texture }) {
  const geometry = useMemo(() => {
    const folds = Math.max(16, Math.round(width / .019)); const positions: number[] = []; const uvs: number[] = []; const indices: number[] = [];
    for (let i = 0; i <= folds; i += 1) {
      const x = -width / 2 + (i / folds) * width; const pleatDepth = (i % 2 === 0 ? -.0025 : .0025);
      positions.push(x, -height / 2, pleatDepth, x, height / 2, pleatDepth);
      const u = (i / folds) * width * 18; uvs.push(u, 0, u, height * 18);
      if (i < folds) { const base = i * 2; indices.push(base, base + 1, base + 3, base, base + 3, base + 2); }
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3)); geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2)); geo.setIndex(indices); geo.computeVertexNormals(); return geo;
  }, [height, width]);
  return <mesh geometry={geometry} position={[0, 0, z]}><meshStandardMaterial map={texture} color={color} side={THREE.DoubleSide} transparent opacity={.76} roughness={.92} metalness={.01} depthWrite={false}/></mesh>;
}

function SlidingLeaf({ side, halfWidth, height, rail, color, finish, progress, onProgressChange, texture }: { side: -1 | 1; halfWidth: number; height: number; rail: number; color: string; finish: string; progress: number; onProgressChange: (value: number) => void; texture: THREE.Texture }) {
  const pleats = useRef<THREE.Group>(null);
  const grip = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const controls = useThree((state) => state.controls) as { enabled: boolean } | null;
  const leafWidth = halfWidth - rail;
  const panelHeight = height - rail * 1.5;
  const fabricWidth = leafWidth - rail;
  const closedX = -side * (halfWidth / 2 - rail / 2);
  const openX = side * (halfWidth / 2 - rail / 2);
  const foldedX = side * (fabricWidth * .42);
  const profileDepth = rail * .72;
  const grooveColor = finish === "white" ? "#494d4b" : finish === "anthracite" ? "#090a0b" : "#30251e";
  useFrame((_, delta) => {
    if (pleats.current) {
      pleats.current.scale.x = THREE.MathUtils.damp(pleats.current.scale.x, 1 - progress * .84, 7, delta);
      pleats.current.position.x = THREE.MathUtils.damp(pleats.current.position.x, foldedX * progress, 7, delta);
    }
    if (grip.current) grip.current.position.x = THREE.MathUtils.damp(grip.current.position.x, THREE.MathUtils.lerp(closedX, openX, progress), 7, delta);
  });
  const dragStart = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation(); dragging.current = true; (event.nativeEvent.currentTarget as HTMLCanvasElement).setPointerCapture(event.pointerId); if (controls) controls.enabled = false;
  };
  const dragMove = (event: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return;
    event.stopPropagation();
    const localX = event.point.x - side * halfWidth / 2;
    const t = THREE.MathUtils.clamp((localX - closedX) / (openX - closedX), 0, 1);
    onProgressChange(t);
  };
  const dragEnd = (event: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return;
    dragging.current = false; const canvas = event.nativeEvent.currentTarget as HTMLCanvasElement; if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId); if (controls) controls.enabled = true;
  };
  return <group position={[side * halfWidth / 2, 0, 0]}>
    <group ref={pleats}>
      <PleatedMesh width={fabricWidth} height={panelHeight - rail} z={0} color="#86918e" texture={texture}/>
    </group>
    <group ref={grip} position={[closedX, 0, .004]} onPointerDown={dragStart} onPointerMove={dragMove} onPointerUp={dragEnd} onPointerCancel={dragEnd} onLostPointerCapture={() => { dragging.current = false; if (controls) controls.enabled = true; }}>
      <mesh position={[0, 0, .008]}><boxGeometry args={[rail * 1.5, panelHeight, profileDepth * 1.5]}/><meshBasicMaterial transparent opacity={0} depthWrite={false}/></mesh>
      <Rail position={[0, 0, 0]} size={[rail, panelHeight, profileDepth]} finish={finish} color={color}/>
      <mesh position={[0, 0, profileDepth / 2 + .0008]}><boxGeometry args={[.008, panelHeight - .09, .0016]}/><meshStandardMaterial color={grooveColor} roughness={.82}/></mesh>
      {[-1, 1].map((lip) => <mesh key={lip} position={[lip * .006, 0, profileDepth / 2 + .0012]}><boxGeometry args={[.0018, panelHeight - .09, .0012]}/><meshStandardMaterial color={finish === "white" ? "#faf9f3" : color} roughness={.42}/></mesh>)}
      <mesh position={[0, 0, profileDepth / 2 + .0011]}><boxGeometry args={[.004, .012, .0012]}/><meshStandardMaterial color={grooveColor} roughness={.82}/></mesh>
    </group>
  </group>;
}

function SlidingPanel({ width, height, rail, color, finish, progress, onProgressChange, texture, double }: SceneProps & { width: number; height: number; rail: number; color: string; texture: THREE.Texture; double: boolean }) {
  const panelWidth = width - rail * 1.5;
  const panelHeight = height - rail * 1.5;
  if (double) {
    const halfWidth = panelWidth / 2;
    return <group>
      {([-1, 1] as const).map((side) => <SlidingLeaf key={side} side={side} halfWidth={halfWidth} height={height} rail={rail} color={color} finish={finish} progress={progress} onProgressChange={onProgressChange} texture={texture}/>)}
    </group>;
  }
  const fabricWidth = panelWidth - rail;
  const closedX = panelWidth / 2 - rail / 2;
  const openX = -fabricWidth * .42;
  const pleats = useRef<THREE.Group>(null);
  const grip = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const controls = useThree((state) => state.controls) as { enabled: boolean } | null;
  const profileDepth = rail * .72;
  const grooveColor = finish === "white" ? "#494d4b" : finish === "anthracite" ? "#090a0b" : "#30251e";
  useFrame((_, delta) => {
    if (pleats.current) { pleats.current.scale.x = THREE.MathUtils.damp(pleats.current.scale.x, 1 - progress * .84, 7, delta); pleats.current.position.x = THREE.MathUtils.damp(pleats.current.position.x, -fabricWidth * .42 * progress, 7, delta); }
    if (grip.current) grip.current.position.x = THREE.MathUtils.damp(grip.current.position.x, THREE.MathUtils.lerp(closedX, openX, progress), 7, delta);
  });
  const move = (event: ThreeEvent<PointerEvent>) => { if (dragging.current) { event.stopPropagation(); onProgressChange(THREE.MathUtils.clamp((event.point.x - closedX) / (openX - closedX), 0, 1)); } };
  const down = (event: ThreeEvent<PointerEvent>) => { event.stopPropagation(); dragging.current = true; (event.nativeEvent.currentTarget as HTMLCanvasElement).setPointerCapture(event.pointerId); if (controls) controls.enabled = false; };
  const up = (event: ThreeEvent<PointerEvent>) => { dragging.current = false; const canvas = event.nativeEvent.currentTarget as HTMLCanvasElement; if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId); if (controls) controls.enabled = true; };
  return <group>
    <group ref={pleats}><PleatedMesh width={fabricWidth} height={panelHeight - rail} z={0} color="#86918e" texture={texture}/></group>
    <group ref={grip} position={[closedX, 0, .004]} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
      <mesh position={[0, 0, .008]}><boxGeometry args={[rail * 1.5, panelHeight, profileDepth * 1.5]}/><meshBasicMaterial transparent opacity={0} depthWrite={false}/></mesh>
      <Rail position={[0, 0, 0]} size={[rail, panelHeight, profileDepth]} finish={finish} color={color}/>
      <mesh position={[0, 0, profileDepth / 2 + .0008]}><boxGeometry args={[.008, panelHeight - .09, .0016]}/><meshStandardMaterial color={grooveColor} roughness={.82}/></mesh>
      {[-1, 1].map((lip) => <mesh key={lip} position={[lip * .006, 0, profileDepth / 2 + .0012]}><boxGeometry args={[.0018, panelHeight - .09, .0012]}/><meshStandardMaterial color={finish === "white" ? "#faf9f3" : color} roughness={.42}/></mesh>)}
    </group>
  </group>;
}

function InstalledOpening({ area, width, height }: { area: "window" | "door"; width: number; height: number }) {
  const outerWidth = width + .58;
  const outerHeight = height + .52;
  const apertureWidth = width + .08;
  const apertureHeight = height + .08;
  const wallGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-outerWidth / 2, -outerHeight / 2); shape.lineTo(outerWidth / 2, -outerHeight / 2);
    shape.lineTo(outerWidth / 2, outerHeight / 2); shape.lineTo(-outerWidth / 2, outerHeight / 2); shape.closePath();
    const hole = new THREE.Path();
    hole.moveTo(-apertureWidth / 2, -apertureHeight / 2); hole.lineTo(-apertureWidth / 2, apertureHeight / 2);
    hole.lineTo(apertureWidth / 2, apertureHeight / 2); hole.lineTo(apertureWidth / 2, -apertureHeight / 2); hole.closePath();
    shape.holes.push(hole);
    return new THREE.ShapeGeometry(shape);
  }, [apertureHeight, apertureWidth, outerHeight, outerWidth]);
  return <group position={[0, -.05, -.16]}>
    <mesh geometry={wallGeometry} position={[0, 0, -.015]}><meshStandardMaterial color="#deded8" side={THREE.DoubleSide} roughness={.9}/></mesh>
    <OpenWindowSash width={apertureWidth} height={apertureHeight}/>
    <group position={[0, 0, .012]}>
      <mesh position={[-apertureWidth / 2 - .032, 0, 0]}><boxGeometry args={[.064, apertureHeight + .064, .055]}/><meshStandardMaterial color="#f3f2ec" roughness={.38}/></mesh>
      <mesh position={[apertureWidth / 2 + .032, 0, 0]}><boxGeometry args={[.064, apertureHeight + .064, .055]}/><meshStandardMaterial color="#f3f2ec" roughness={.38}/></mesh>
      <mesh position={[0, apertureHeight / 2 + .032, 0]}><boxGeometry args={[apertureWidth, .064, .055]}/><meshStandardMaterial color="#f3f2ec" roughness={.38}/></mesh>
      <mesh position={[0, -apertureHeight / 2 - .032, area === "door" ? .008 : 0]}><boxGeometry args={[apertureWidth, area === "door" ? .04 : .064, .055]}/><meshStandardMaterial color="#f3f2ec" roughness={.38}/></mesh>
    </group>
  </group>;
}

function ProductModel(props: SceneProps) {
  const { area, system, finish, width: widthCm, height: heightCm, installed, mountAnimationKey } = props;
  const height = area === "door" ? 2.18 : 1.72;
  const ratio = widthCm / Math.max(heightCm, 1);
  const width = THREE.MathUtils.clamp(height * ratio, .82, 2.48);
  // 28 mm visible profile face; the photo shows a hollow extrusion, with depth kept proportional.
  const rail = .028; const depth = .020;
  const colors: Record<string, string> = { white: "#f4f3ed", anthracite: "#383e42", "golden-oak": "#b77a45" };
  const frameColor = colors[finish] ?? colors.anthracite;
  const meshTexture = useMemo(() => makeMeshTexture(), []);
  const mountingWidth = system === "hinged" ? width + .08 : width;
  const mountingHeight = system === "hinged" ? height + .08 : height;
  const mountingDepth = system === "hinged" ? -.002 : 0;
  const mountSurfaceZ = mountingDepth + depth / 2;
  return <group position={[0, -.05, 0]}>
    {installed && <InstalledOpening area={area} width={width} height={height}/>}
    {system === "hinged" ? <>
      {installed && <group position={[0, 0, mountingDepth]}><Frame width={mountingWidth} height={mountingHeight} rail={rail} depth={depth} finish={finish} color={frameColor}/></group>}
      <HingedPanel {...props} width={width} height={height} rail={rail} depth={depth} color={frameColor} texture={meshTexture}/>
      {installed && <MagneticCatch position={[width / 2 + .018, 0, depth * .7]} color={finish === "white" ? "#f4f3ed" : "#363c3e"}/>}
    </> : <>
      <Frame width={width} height={height} rail={rail} depth={depth} finish={finish} color={frameColor}/>
      <SlidingPanel {...props} width={width} height={height} rail={rail} color={frameColor} finish={finish} texture={meshTexture} double={widthCm > 200}/>
    </>}
    {installed && <MountingScrews width={mountingWidth} height={mountingHeight} rail={rail} surfaceZ={mountSurfaceZ} trigger={mountAnimationKey}/>}
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
