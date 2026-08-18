import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleSwarmBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;
    let renderer, scene, camera, mesh;

    try {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x02040a, 0.008);

      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0, 80);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x02040a, 1);
      container.appendChild(renderer.domElement);

      const count = 8000;
      const geometry = new THREE.TetrahedronGeometry(0.22);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

      mesh = new THREE.InstancedMesh(geometry, material, count);
      scene.add(mesh);

      const dummy = new THREE.Object3D();
      const target = new THREE.Vector3();
      const color = new THREE.Color();

      const currentPositions = [];
      for (let i = 0; i < count; i++) {
        currentPositions.push(new THREE.Vector3((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100));
      }

      const PARAMS = { n: 3, l: 2, m: 1, scale: 22, spin: 0.3, breathe: 0.4, jitter: 0.25 };
      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const time = clock.getElapsedTime();
        scene.rotation.y = time * 0.05;

        for (let i = 0; i < count; i++) {
          const n = 3;
          const lMax = 2;
          const mAbs = 1;
          const scale = PARAMS.scale;
          const spin = PARAMS.spin;
          const breathe = PARAMS.breathe;
          const cloudJitter = PARAMS.jitter;

          const a0 = scale * 0.5;
          const TAU = Math.PI * 2;

          const h1 = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
          const rand1 = h1 - Math.floor(h1);
          const h2 = Math.sin(i * 39.3468 + 11.135) * 24634.6345;
          const rand2 = h2 - Math.floor(h2);
          const h3 = Math.sin(i * 93.9898 + 47.233) * 95734.5453;
          const rand3 = h3 - Math.floor(h3);

          const u = (i + 1) / count;
          const baseR = -Math.log(1.0 - u * 0.999);
          const radialPower = (n * n) - (n - 1 - lMax);
          let r = baseR * a0 * (n * n) * 0.5 / Math.max(1, radialPower * 0.3);

          const nodeCount = n - lMax - 1;
          const nodeMod = nodeCount > 0
            ? Math.abs(Math.sin((r / (a0 * n)) * Math.PI * (nodeCount + 1)))
            : 1.0;
          r *= 0.6 + 0.8 * nodeMod;

          const phi = rand1 * TAU + time * spin;
          let theta = Math.acos(1.0 - 2.0 * rand2);

          const cosT = Math.cos(theta);
          const sinT = Math.sin(theta);
          let lobe;
          if (lMax === 0) {
            lobe = 1.0;
          } else if (lMax === 1) {
            if (mAbs === 0) lobe = cosT * cosT;
            else lobe = sinT * sinT * Math.cos(phi) * Math.cos(phi);
          } else if (lMax === 2) {
            if (mAbs === 0) {
              const c2 = 3.0 * cosT * cosT - 1.0;
              lobe = c2 * c2 * 0.25;
            } else if (mAbs === 1) {
              lobe = sinT * sinT * cosT * cosT * 4.0;
            } else {
              lobe = sinT * sinT * sinT * sinT * Math.cos(2.0 * phi) * Math.cos(2.0 * phi);
            }
          } else {
            const bands = Math.cos(theta * lMax);
            lobe = bands * bands;
            if (mAbs > 0) {
              const az = Math.cos(mAbs * phi);
              lobe *= az * az;
            }
          }

          const lobeWeight = 0.15 + 0.85 * Math.min(1.0, lobe);
          r *= lobeWeight;

          const breath = 1.0 + breathe * 0.15 * Math.sin(time * 1.2 + r * 0.05);
          r *= breath;

          const jitter = 1.0 + (rand3 - 0.5) * cloudJitter;
          r *= jitter;

          const sinTheta = Math.sin(theta);
          const x = r * sinTheta * Math.cos(phi);
          const y = r * Math.cos(theta);
          const z = r * sinTheta * Math.sin(phi);

          target.set(x, y, z);

          const orbitalHue = (n * 0.13 + lMax * 0.21 + mAbs * 0.07) % 1.0;
          const phaseShift = mAbs > 0 ? 0.5 + 0.5 * Math.cos(mAbs * phi) : 1.0;
          const lightness = 0.25 + 0.45 * Math.min(1.0, lobe) * phaseShift;
          const saturation = 0.7 + 0.3 * nodeMod;
          color.setHSL(orbitalHue, saturation, lightness);

          currentPositions[i].lerp(target, 0.1);
          dummy.position.copy(currentPositions[i]);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
          mesh.setColorAt(i, color);
        }

        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!renderer || !camera) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        if (geometry) geometry.dispose();
        if (material) material.dispose();
      };
    } catch (err) {
      console.warn('ParticleSwarmBackground initialized fallback:', err);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: '#02040a',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
