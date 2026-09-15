import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const HabitatSystemScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layoutMode, setLayoutMode] = useState<0 | 1 | 2>(0);
  const [finish, setFinish] = useState<'walnut' | 'oak'>('walnut');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x181716);

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(4.5, 3.8, 5.0);

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
    controls.maxDistance = 10.0;

    // Architectural Daylight & Ambient Fill
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.8);
    scene.add(ambientLight);

    const windowLight = new THREE.DirectionalLight(0xfff8ee, 4.0);
    windowLight.position.set(5, 7, 3);
    windowLight.castShadow = true;
    scene.add(windowLight);

    const roomGroup = new THREE.Group();
    scene.add(roomGroup);

    // Limestone Floor Plate
    const floorMat = new THREE.MeshStandardMaterial({ color: 0xdfd8ce, roughness: 0.85 });
    const floorMesh = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.15, 5.2), floorMat);
    floorMesh.position.y = -0.075;
    floorMesh.receiveShadow = true;
    roomGroup.add(floorMesh);

    // Neutral Back Partition Walls
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xe8e2d8, roughness: 0.9 });
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(5.2, 3.2, 0.15), wallMat);
    backWall.position.set(0, 1.6, -2.55);
    backWall.receiveShadow = true;
    roomGroup.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.15, 3.2, 5.2), wallMat);
    leftWall.position.set(-2.55, 1.6, 0);
    leftWall.receiveShadow = true;
    roomGroup.add(leftWall);

    // Modular Furniture Components
    const woodColor = finish === 'walnut' ? 0x4a3220 : 0xc2a683;
    const woodMat = new THREE.MeshStandardMaterial({ color: woodColor, roughness: 0.55 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x2b2927, roughness: 0.4 });

    // Module 1: Main Credenza Base
    const credenza = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.55, 0.8), woodMat);
    credenza.position.set(0, 0.275, -1.8);
    credenza.castShadow = true;
    credenza.receiveShadow = true;
    roomGroup.add(credenza);

    // Module 2: Floating Stone Top Shelf
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.08, 0.45), stoneMat);
    shelf.position.set(0, 1.4, -2.2);
    shelf.castShadow = true;
    roomGroup.add(shelf);

    // Module 3: Vertical Book Tower / Storage Module
    const tower = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.8, 0.5), woodMat);
    tower.position.set(-1.6, 0.9, -1.8);
    tower.castShadow = true;
    roomGroup.add(tower);

    // Module 4: Lounge Seat Ottoman
    const seatMat = new THREE.MeshStandardMaterial({ color: 0xb8aba0, roughness: 0.85 });
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.4, 0.9), seatMat);
    seat.position.set(0.6, 0.2, 0.2);
    seat.castShadow = true;
    roomGroup.add(seat);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow architectural overview rotation
      roomGroup.rotation.y = Math.sin(elapsed * 0.15) * 0.06;

      // Layout morphing
      if (layoutMode === 0) {
        // Minimal Study
        credenza.position.x = THREE.MathUtils.lerp(credenza.position.x, 0, 0.08);
        shelf.position.y = THREE.MathUtils.lerp(shelf.position.y, 1.4, 0.08);
        tower.position.x = THREE.MathUtils.lerp(tower.position.x, -1.6, 0.08);
        seat.position.set(THREE.MathUtils.lerp(seat.position.x, 0.6, 0.08), 0.2, THREE.MathUtils.lerp(seat.position.z, 0.2, 0.08));
      } else if (layoutMode === 1) {
        // Credenza Lounge
        credenza.position.x = THREE.MathUtils.lerp(credenza.position.x, 0.6, 0.08);
        shelf.position.y = THREE.MathUtils.lerp(shelf.position.y, 1.8, 0.08);
        tower.position.x = THREE.MathUtils.lerp(tower.position.x, -1.8, 0.08);
        seat.position.set(THREE.MathUtils.lerp(seat.position.x, -0.4, 0.08), 0.2, THREE.MathUtils.lerp(seat.position.z, 0.8, 0.08));
      } else {
        // Compact Library
        credenza.position.x = THREE.MathUtils.lerp(credenza.position.x, -0.8, 0.08);
        shelf.position.y = THREE.MathUtils.lerp(shelf.position.y, 1.2, 0.08);
        tower.position.x = THREE.MathUtils.lerp(tower.position.x, 1.5, 0.08);
        seat.position.set(THREE.MathUtils.lerp(seat.position.x, 0, 0.08), 0.2, THREE.MathUtils.lerp(seat.position.z, 0, 0.08));
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
  }, [layoutMode, finish]);

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
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        <button
          onClick={() => setLayoutMode(0)}
          style={{
            padding: '9px 14px',
            backgroundColor: layoutMode === 0 ? '#684C38' : 'rgba(250, 248, 243, 0.9)',
            color: layoutMode === 0 ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Study Layout
        </button>

        <button
          onClick={() => setLayoutMode(1)}
          style={{
            padding: '9px 14px',
            backgroundColor: layoutMode === 1 ? '#684C38' : 'rgba(250, 248, 243, 0.9)',
            color: layoutMode === 1 ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Lounge Layout
        </button>

        <button
          onClick={() => setLayoutMode(2)}
          style={{
            padding: '9px 14px',
            backgroundColor: layoutMode === 2 ? '#684C38' : 'rgba(250, 248, 243, 0.9)',
            color: layoutMode === 2 ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Library Layout
        </button>

        <button
          onClick={() => setFinish(finish === 'walnut' ? 'oak' : 'walnut')}
          style={{
            padding: '9px 14px',
            backgroundColor: 'rgba(250, 248, 243, 0.9)',
            color: '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: '600',
            border: '1px solid rgba(0,0,0,0.1)',
            cursor: 'pointer'
          }}
        >
          Wood: {finish === 'walnut' ? 'American Walnut' : 'Natural Oak'}
        </button>
      </div>
    </div>
  );
};
