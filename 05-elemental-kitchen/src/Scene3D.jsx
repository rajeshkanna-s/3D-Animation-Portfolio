import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const ElementalKitchenScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cookingStage, setCookingStage] = useState(0); // 0: Orbiting, 1: Pan Toss, 2: Searing

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x141210);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.4, 4.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.minDistance = 2.8;
    controls.maxDistance = 7.5;

    // Warm Culinary Lighting
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.4);
    scene.add(ambientLight);

    const burnerGlow = new THREE.PointLight(0xff5500, 4.0, 8);
    burnerGlow.position.set(0, -0.6, 0);
    scene.add(burnerGlow);

    const keySpot = new THREE.SpotLight(0xfffaed, 4.5, 14, Math.PI / 4, 0.3);
    keySpot.position.set(3, 5, 3);
    keySpot.castShadow = true;
    scene.add(keySpot);

    const masterKitchenGroup = new THREE.Group();
    scene.add(masterKitchenGroup);

    // 1. Heavy Seasoned Cast-Iron Skillet
    const panMat = new THREE.MeshStandardMaterial({
      color: 0x1f1d1b,
      metalness: 0.85,
      roughness: 0.45
    });

    // Pan bowl
    const panGeo = new THREE.CylinderGeometry(1.6, 1.35, 0.35, 48);
    const panMesh = new THREE.Mesh(panGeo, panMat);
    panMesh.castShadow = true;
    panMesh.receiveShadow = true;
    masterKitchenGroup.add(panMesh);

    // Cast iron handle
    const handleGeo = new THREE.BoxGeometry(0.24, 0.12, 1.6);
    const handleMesh = new THREE.Mesh(handleGeo, panMat);
    handleMesh.position.set(0, 0.08, 1.8);
    handleMesh.castShadow = true;
    masterKitchenGroup.add(handleMesh);

    // Sizzling oil sheen layer
    const oilMat = new THREE.MeshStandardMaterial({
      color: 0xc49b38,
      metalness: 0.4,
      roughness: 0.08
    });
    const oilMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 0.02, 32), oilMat);
    oilMesh.position.y = 0.16;
    masterKitchenGroup.add(oilMesh);

    // 2. Dynamic Orbiting / Sizzling Food Ingredients
    const foodItems: { mesh: THREE.Mesh; rad: number; angle: number; speed: number; yOffset: number }[] = [];

    // Red Chili / Tomato wedges
    const chiliMat = new THREE.MeshPhysicalMaterial({ color: 0xd2352b, roughness: 0.2, clearcoat: 0.8 });
    for (let i = 0; i < 5; i++) {
      const wedge = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.45), chiliMat);
      wedge.castShadow = true;
      masterKitchenGroup.add(wedge);
      foodItems.push({ mesh: wedge, rad: 0.7, angle: (i / 5) * Math.PI * 2, speed: 1.2, yOffset: 0.25 });
    }

    // Golden Garlic Cloves
    const garlicMat = new THREE.MeshStandardMaterial({ color: 0xfae8b2, roughness: 0.35 });
    for (let i = 0; i < 4; i++) {
      const clove = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), garlicMat);
      clove.scale.set(1.4, 0.8, 1.0);
      clove.castShadow = true;
      masterKitchenGroup.add(clove);
      foodItems.push({ mesh: clove, rad: 0.5, angle: (i / 4) * Math.PI * 2 + 0.4, speed: 1.0, yOffset: 0.22 });
    }

    // Fresh Herb Basil Leaves
    const herbMat = new THREE.MeshStandardMaterial({ color: 0x2e6e37, roughness: 0.5 });
    for (let i = 0; i < 6; i++) {
      const herb = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.35, 6), herbMat);
      herb.scale.set(1, 1, 0.15);
      masterKitchenGroup.add(herb);
      foodItems.push({ mesh: herb, rad: 0.9, angle: (i / 6) * Math.PI * 2 + 0.2, speed: 1.4, yOffset: 0.26 });
    }

    // 3. Steam GPU Particle Planes
    const steamGeo = new THREE.BufferGeometry();
    const steamCount = 35;
    const steamPos = new Float32Array(steamCount * 3);
    for (let i = 0; i < steamCount; i++) {
      steamPos[i * 3] = (Math.random() - 0.5) * 1.4;
      steamPos[i * 3 + 1] = 0.2 + Math.random() * 1.5;
      steamPos[i * 3 + 2] = (Math.random() - 0.5) * 1.4;
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));

    const steamMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.18,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    masterKitchenGroup.add(steamParticles);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Pan motion by stage
      if (cookingStage === 1) {
        // Pan toss rhythm
        masterKitchenGroup.rotation.x = Math.sin(elapsed * 4.0) * 0.18;
        masterKitchenGroup.position.y = Math.abs(Math.sin(elapsed * 4.0)) * 0.2;
      } else {
        masterKitchenGroup.rotation.x = 0.2;
        masterKitchenGroup.position.y = 0;
      }

      // Ingredient motions
      foodItems.forEach((f, idx) => {
        if (cookingStage === 0) {
          // Radial Orbiting
          f.angle += f.speed * 0.015;
          const rad = 1.0 + Math.sin(elapsed * 2.0 + idx) * 0.4;
          f.mesh.position.x = Math.cos(f.angle) * rad;
          f.mesh.position.z = Math.sin(f.angle) * rad;
          f.mesh.position.y = 0.6 + Math.sin(elapsed * 3.0 + idx) * 0.3;
          f.mesh.rotation.y += 0.03;
        } else if (cookingStage === 1) {
          // Dynamic Pan Toss cascade
          f.mesh.position.y = 0.25 + Math.abs(Math.sin(elapsed * 4.0 + idx * 0.2)) * 0.9;
          f.mesh.rotation.x += 0.06;
        } else {
          // Searing in pan
          f.angle += 0.005;
          f.mesh.position.x = Math.cos(f.angle) * f.rad;
          f.mesh.position.z = Math.sin(f.angle) * f.rad;
          f.mesh.position.y = f.yOffset + Math.sin(elapsed * 8.0 + idx) * 0.015; // Sizzle vibration
        }
      });

      // Rising steam
      const sPositions = steamParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < steamCount; i++) {
        sPositions[i * 3 + 1] += 0.012;
        if (sPositions[i * 3 + 1] > 2.0) {
          sPositions[i * 3 + 1] = 0.2;
        }
      }
      steamParticles.geometry.attributes.position.needsUpdate = true;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [cookingStage]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />

      {/* Interactive Controls Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: '24px',
          right: 'clamp(20px, 4vw, 48px)',
          zIndex: 10,
          display: 'flex',
          gap: '8px'
        }}
      >
        <button
          onClick={() => setCookingStage(0)}
          style={{
            padding: '9px 16px',
            backgroundColor: cookingStage === 0 ? '#D24B35' : 'rgba(250, 248, 243, 0.9)',
            color: cookingStage === 0 ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Radial Orbit
        </button>

        <button
          onClick={() => setCookingStage(1)}
          style={{
            padding: '9px 16px',
            backgroundColor: cookingStage === 1 ? '#D24B35' : 'rgba(250, 248, 243, 0.9)',
            color: cookingStage === 1 ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Pan Toss
        </button>

        <button
          onClick={() => setCookingStage(2)}
          style={{
            padding: '9px 16px',
            backgroundColor: cookingStage === 2 ? '#D24B35' : 'rgba(250, 248, 243, 0.9)',
            color: cookingStage === 2 ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Searing Dish
        </button>
      </div>
    </div>
  );
};

export default ElementalKitchenScene3D;
