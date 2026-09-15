import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const Molecule08Scene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNote, setActiveNote] = useState<'top' | 'heart' | 'base'>('heart');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x100f12);

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 4.6);

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
    controls.minDistance = 2.4;
    controls.maxDistance = 7.0;

    // High-Contrast Luxury Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e0, 4.2);
    keyLight.position.set(4, 5, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const amberBacklight = new THREE.PointLight(0xff9922, 5.0, 8);
    amberBacklight.position.set(0, 0.2, -1.8);
    scene.add(amberBacklight);

    const bottleGroup = new THREE.Group();
    scene.add(bottleGroup);

    // 1. Heavy Amber Glass Flacon
    const amberGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xd98634,
      transmission: 0.82,
      ior: 1.54,
      roughness: 0.04,
      thickness: 1.8,
      specularIntensity: 5.0,
      clearcoat: 1.0,
      transparent: true
    });
    const bottleGeo = new THREE.BoxGeometry(1.2, 1.6, 0.85);
    const bottleMesh = new THREE.Mesh(bottleGeo, amberGlassMat);
    bottleMesh.position.y = 0.1;
    bottleMesh.castShadow = true;
    bottleGroup.add(bottleMesh);

    // Golden Magnetic Atomizer Collar
    const collarMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.14 });
    const collarMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.35, 32), collarMat);
    collarMesh.position.y = 1.05;
    bottleGroup.add(collarMesh);

    // Heavy Black Bakelite Cap
    const capMat = new THREE.MeshStandardMaterial({ color: 0x141414, metalness: 0.2, roughness: 0.25 });
    const capMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.65, 32), capMat);
    capMesh.position.y = 1.45;
    bottleGroup.add(capMesh);

    // 2. Interactive 3D Molecular Wireframe Lattice
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);

    const atomMat = new THREE.MeshStandardMaterial({
      color: 0xffe899,
      emissive: 0xc78d46,
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    const bondMat = new THREE.MeshBasicMaterial({ color: 0xfffae0, wireframe: true });

    // Molecule cage
    const moleculeGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const moleculeWire = new THREE.Mesh(moleculeGeo, bondMat);
    moleculeGroup.add(moleculeWire);

    // Molecule Nodes (Atoms)
    const atomCount = 12;
    const atoms: THREE.Mesh[] = [];
    for (let i = 0; i < atomCount; i++) {
      const atom = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), atomMat);
      const phi = Math.acos(-1 + (2 * i) / atomCount);
      const theta = Math.sqrt(atomCount * Math.PI) * phi;
      atom.position.setFromSphericalCoords(1.6, phi, theta);
      moleculeGroup.add(atom);
      atoms.push(atom);
    }

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow bottle rotation
      bottleGroup.rotation.y = Math.sin(elapsed * 0.3) * 0.2;

      // Molecule lattice rotation speed depends on active note volatility
      const speed = activeNote === 'top' ? 1.8 : activeNote === 'heart' ? 0.9 : 0.4;
      moleculeGroup.rotation.y += 0.008 * speed;
      moleculeGroup.rotation.x = Math.sin(elapsed * 0.5 * speed) * 0.15;

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
  }, [activeNote]);

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
          onClick={() => setActiveNote('top')}
          style={{
            padding: '9px 16px',
            backgroundColor: activeNote === 'top' ? '#C78D46' : 'rgba(250, 248, 243, 0.9)',
            color: activeNote === 'top' ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Top: Pink Pepper
        </button>

        <button
          onClick={() => setActiveNote('heart')}
          style={{
            padding: '9px 16px',
            backgroundColor: activeNote === 'heart' ? '#C78D46' : 'rgba(250, 248, 243, 0.9)',
            color: activeNote === 'heart' ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Heart: Cardamom
        </button>

        <button
          onClick={() => setActiveNote('base')}
          style={{
            padding: '9px 16px',
            backgroundColor: activeNote === 'base' ? '#C78D46' : 'rgba(250, 248, 243, 0.9)',
            color: activeNote === 'base' ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Base: Warm Amber
        </button>
      </div>
    </div>
  );
};
