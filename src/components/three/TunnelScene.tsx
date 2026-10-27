"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Túnel en herradura dibujado como un escaneo LiDAR: nube de puntos del
 * perfil excavado, anillos de revestimiento cada tramo y paquetes de datos
 * que viajan por la clave. La cámara avanza como un frente de excavación.
 */

const R = 5; // radio de bóveda
const WALL = 2.2; // altura de hastiales
const LENGTH = 220;
const RING_STEP = 6;

function profilePoint(t: number): [number, number] {
  // t en [0,1): recorre hastial izq → bóveda → hastial der → solera
  const vault = Math.PI * R;
  const total = WALL * 2 + vault + 2 * R;
  let d = t * total;
  if (d < WALL) return [-R, d];
  d -= WALL;
  if (d < vault) {
    const a = Math.PI - d / R;
    return [Math.cos(a) * R, WALL + Math.sin(a) * R];
  }
  d -= vault;
  if (d < WALL) return [R, WALL - d];
  d -= WALL;
  return [R - d, 0];
}

export default function TunnelScene({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({ antialias: !isSmall, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070a, 0.028);
    const camera = new THREE.PerspectiveCamera(70, mount.clientWidth / mount.clientHeight, 0.1, 200);
    camera.position.set(0, WALL + 1.2, 0);

    const world = new THREE.Group();
    scene.add(world);

    // Nube de puntos del perfil excavado
    const count = isSmall ? 22000 : 42000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const base = new THREE.Color(0x8aa0b4);
    const warm = new THREE.Color(0xff6b1a);
    for (let i = 0; i < count; i++) {
      const [x, y] = profilePoint(Math.random());
      const n = (Math.random() - 0.5) * 0.35; // sobreexcavación
      const len = Math.hypot(x, y - WALL) || 1;
      pos[i * 3] = x + (y > WALL ? (x / len) * n : Math.sign(x) * n * 0.6);
      pos[i * 3 + 1] = y + (y > WALL ? ((y - WALL) / len) * n : 0);
      pos[i * 3 + 2] = -Math.random() * LENGTH;
      const c = Math.random() < 0.04 ? warm : base;
      const k = 0.55 + Math.random() * 0.45;
      col[i * 3] = c.r * k;
      col[i * 3 + 1] = c.g * k;
      col[i * 3 + 2] = c.b * k;
    }
    const cloudGeo = new THREE.BufferGeometry();
    cloudGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    cloudGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const cloud = new THREE.Points(
      cloudGeo,
      new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false, sizeAttenuation: true }),
    );
    world.add(cloud);

    // Anillos de revestimiento (cerchas)
    const ringPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 120; i++) {
      const [x, y] = profilePoint((i / 120) * 0.83);
      ringPts.push(new THREE.Vector3(x * 0.97, y, 0));
    }
    const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPts);
    const ringMat = new THREE.LineBasicMaterial({ color: 0xff6b1a, transparent: true, opacity: 0.55 });
    const ringMatCyan = new THREE.LineBasicMaterial({ color: 0x39d5ff, transparent: true, opacity: 0.35 });
    for (let z = 0; z < LENGTH; z += RING_STEP) {
      const ring = new THREE.Line(ringGeo, (z / RING_STEP) % 5 === 0 ? ringMatCyan : ringMat);
      ring.position.z = -z;
      world.add(ring);
    }

    // Eje de datos en la clave y líneas de solera
    const railGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -LENGTH)]);
    const railMat = new THREE.LineBasicMaterial({ color: 0x39d5ff, transparent: true, opacity: 0.4 });
    [-1.6, 1.6].forEach((x) => {
      const l = new THREE.Line(railGeo, railMat);
      l.position.set(x, 0.02, 0);
      world.add(l);
    });
    const crown = new THREE.Line(railGeo, railMat);
    crown.position.set(0, WALL + R - 0.15, 0);
    world.add(crown);

    // Paquetes de datos viajando por el túnel
    const packets = isSmall ? 70 : 160;
    const pPos = new Float32Array(packets * 3);
    const speeds = new Float32Array(packets);
    for (let i = 0; i < packets; i++) {
      const [x, y] = profilePoint(Math.random() * 0.83);
      pPos[i * 3] = x * 0.92;
      pPos[i * 3 + 1] = y * 0.98;
      pPos[i * 3 + 2] = -Math.random() * LENGTH;
      speeds[i] = 0.15 + Math.random() * 0.5;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.16, color: 0x39d5ff, transparent: true, opacity: 0.95, depthWrite: false, blending: THREE.AdditiveBlending });
    world.add(new THREE.Points(pGeo, pMat));

    // Interacción
    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 });
    io.observe(mount);

    let travel = 0;
    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const scrollBoost = Math.min(window.scrollY / window.innerHeight, 1.5);
      travel = (travel + dt * (2.2 + scrollBoost * 9)) % RING_STEP;
      world.position.z = travel;

      const arr = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < packets; i++) {
        arr[i * 3 + 2] += speeds[i] * dt * 30;
        if (arr[i * 3 + 2] > 4) arr[i * 3 + 2] = -LENGTH;
      }
      pGeo.attributes.position.needsUpdate = true;

      camera.position.x += (pointer.x * 1.4 - camera.position.x) * 0.04;
      camera.position.y += (WALL + 1.2 - pointer.y * 0.8 - camera.position.y) * 0.04;
      camera.lookAt(pointer.x * 0.6, WALL + 0.8, -30);
      camera.rotation.z = -pointer.x * 0.05;
      renderer.render(scene, camera);
    };

    if (reduce) {
      camera.lookAt(0, WALL + 0.8, -30);
      renderer.render(scene, camera);
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose?.();
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
