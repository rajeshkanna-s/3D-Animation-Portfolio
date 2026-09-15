import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const LivingModulesScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<'work' | 'lounge'>('work');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x161514);

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(4.2, 4.0, 5.0);

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
    controls.minDistance = 3.5;
    controls.maxDistance = 9.5;

    // Nordic Ambient Light & Sunlight
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.8);
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(0xfff6ea, 4.2);
    sun.position.set(5, 7, 4);
    sun.castShadow = true;
    scene.add(sun);

    const roomGroup = new THREE.Group();
    scene.add(roomGroup);

    // Light Birch Floor
    const floorMat = new THREE.MeshStandardMaterial({ color: 0xdfd3c3, roughness: 0.7 });
    const floor = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.12, 5.0), floorMat);
    floor.position.y = -0.06;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // Wall Partitions
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xede8e1, roughness: 0.9 });
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(5.0, 2.6, 0.15), wallMat);
    backWall.position.set(0, 1.3, -2.45);
    backWall.receiveShadow = true;
    roomGroup.add(backWall);

    const sideWall = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.6, 5.0), wallMat);
    sideWall.position.set(-2.45, 1.3, 0);
    sideWall.receiveShadow = true;
    roomGroup.add(sideWall);

    // Furniture Modules
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xb58f68, roughness: 0.6 });
    const fabricMat = new THREE.MeshStandardMaterial({ color: 0x6e6459, roughness: 0.9 });

    // Desk / Dining Table
    const table = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.08, 0.9), woodMat);
    table.position.set(0.5, 0.72, -0.6);
    table.castShadow = true;
    table.receiveShadow = true;
    roomGroup.add(table);

    // Table legs
    for (let x = -0.75; x <= 0.75; x += 1.5) {
      for (let z = -0.35; z <= 0.35; z += 0.7) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.7, 16), woodMat);
        leg.position.set(0.5 + x, 0.35, -0.6 + z);
        leg.castShadow = true;
        roomGroup.add(leg);
      }
    }

    // Scandinavian Lounge Armchair
    const chairGroup = new THREE.Group();
    const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.12, 0.8), fabricMat);
    chairSeat.position.y = 0.35;
    chairGroup.add(chairSeat);

    const chairBack = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.12), fabricMat);
    chairBack.position.set(0, 0.65, -0.34);
    chairGroup.add(chairBack);

    chairGroup.position.set(-0.8, 0, 0.6);
    chairGroup.rotation.y = 0.4;
    roomGroup.add(chairGroup);

    // Modular Wall Bookshelf
    const shelfMat = new THREE.MeshStandardMaterial({ color: 0x2b2724, roughness: 0.5 });
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.4, 0.35), shelfMat);
    shelf.position.set(-1.4, 1.6, -2.2);
    shelf.castShadow = true;
    roomGroup.add(shelf);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle room oscillation
      roomGroup.rotation.y = Math.sin(elapsed * 0.18) * 0.05;

      // Layout transitions
      if (layout === 'work') {
        table.position.x = THREE.MathUtils.lerp(table.position.x, 0.5, 0.08);
        table.position.z = THREE.MathUtils.lerp(table.position.z, -0.6, 0.08);
        chairGroup.position.x = THREE.MathUtils.lerp(chairGroup.position.x, 0.5, 0.08);
        chairGroup.position.z = THREE.MathUtils.lerp(chairGroup.position.z, 0.2, 0.08);
        chairGroup.rotation.y = THREE.MathUtils.lerp(chairGroup.rotation.y, 0, 0.08);
      } else {
        table.position.x = THREE.MathUtils.lerp(table.position.x, 1.2, 0.08);
        table.position.z = THREE.MathUtils.lerp(table.position.z, -1.2, 0.08);
        chairGroup.position.x = THREE.MathUtils.lerp(chairGroup.position.x, -0.4, 0.08);
        chairGroup.position.z = THREE.MathUtils.lerp(chairGroup.position.z, 0.6, 0.08);
        chairGroup.rotation.y = THREE.MathUtils.lerp(chairGroup.rotation.y, 0.6, 0.08);
      }

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
  }, [layout]);

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
          onClick={() => setLayout('work')}
          style={{
            padding: '9px 16px',
            backgroundColor: layout === 'work' ? '#706050' : 'rgba(250, 248, 243, 0.9)',
            color: layout === 'work' ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Day Workstation
        </button>

        <button
          onClick={() => setLayout('lounge')}
          style={{
            padding: '9px 16px',
            backgroundColor: layout === 'lounge' ? '#706050' : 'rgba(250, 248, 243, 0.9)',
            color: layout === 'lounge' ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Evening Lounge
        </button>
      </div>
    </div>
  );
};
