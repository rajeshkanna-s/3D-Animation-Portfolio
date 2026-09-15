import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const FormulaScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(3);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121415);

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 4.8);

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
    controls.maxDistance = 7.5;

    // Clinical Laboratory Lighting
    const ambientLight = new THREE.AmbientLight(0xdde8f0, 1.8);
    scene.add(ambientLight);

    const overheadLight = new THREE.DirectionalLight(0xffffff, 4.2);
    overheadLight.position.set(0, 6, 3);
    overheadLight.castShadow = true;
    scene.add(overheadLight);

    const labGroup = new THREE.Group();
    scene.add(labGroup);

    // 1. Borosilicate Glass Erlenmeyer Flask (Left)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      ior: 1.52,
      roughness: 0.04,
      thickness: 0.8,
      transparent: true
    });
    const flaskGeo = new THREE.ConeGeometry(0.8, 1.4, 32);
    const flaskMesh = new THREE.Mesh(flaskGeo, glassMat);
    flaskMesh.position.set(-1.4, 0.4, 0);
    labGroup.add(flaskMesh);

    // Liquid in Flask
    const flaskLiquidMat = new THREE.MeshPhysicalMaterial({
      color: 0x4aa37a,
      transmission: 0.7,
      roughness: 0.1,
      transparent: true
    });
    const liquidGeo = new THREE.ConeGeometry(0.65, 0.7, 24);
    const flaskLiquid = new THREE.Mesh(liquidGeo, flaskLiquidMat);
    flaskLiquid.position.set(-1.4, 0.05, 0);
    labGroup.add(flaskLiquid);

    // 2. Cosmetic Dropper Bottle (Right)
    const bottleMat = new THREE.MeshPhysicalMaterial({
      color: 0xd9e5dd,
      transmission: 0.85,
      ior: 1.5,
      roughness: 0.12,
      thickness: 1.0,
      transparent: true
    });
    const bottleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.52, 1.5, 32), bottleMat);
    bottleMesh.position.set(1.4, 0.4, 0);
    bottleMesh.castShadow = true;
    labGroup.add(bottleMesh);

    // Liquid in Bottle
    const bottleLiquid = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.46, 1.1, 24), flaskLiquidMat);
    bottleLiquid.position.set(1.4, 0.2, 0);
    labGroup.add(bottleLiquid);

    // Precision Dropper Cap
    const capMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.4 });
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.4, 24), capMat);
    cap.position.set(1.4, 1.35, 0);
    labGroup.add(cap);

    // 3. Fluid Transfer Tubing (CatmullRomCurve connecting flask to bottle)
    const tubeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.4, 1.2, 0),
      new THREE.Vector3(-0.7, 1.8, 0.3),
      new THREE.Vector3(0.0, 1.9, -0.2),
      new THREE.Vector3(0.7, 1.8, 0.2),
      new THREE.Vector3(1.4, 1.2, 0)
    ]);
    const tubeGeo = new THREE.TubeGeometry(tubeCurve, 40, 0.045, 12, false);
    const tubeMesh = new THREE.Mesh(tubeGeo, glassMat);
    labGroup.add(tubeMesh);

    // Inner Liquid Stream in Tube
    const fluidStreamMat = new THREE.MeshBasicMaterial({ color: 0x55cc99, wireframe: false });
    const fluidStream = new THREE.Mesh(new THREE.TubeGeometry(tubeCurve, 40, 0.032, 8, false), fluidStreamMat);
    labGroup.add(fluidStream);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Fluid pulse in tube
      fluidStream.scale.set(1, 1, 1 + Math.sin(elapsed * 4.0) * 0.05);

      // Stage camera focus
      if (stage === 1) {
        controls.target.set(-1.4, 0.5, 0);
      } else if (stage === 4) {
        controls.target.set(1.4, 0.5, 0);
      } else {
        controls.target.set(0, 0.8, 0);
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
  }, [stage]);

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
          onClick={() => setStage(1)}
          style={{
            padding: '9px 14px',
            backgroundColor: stage === 1 ? '#5B7065' : 'rgba(250, 248, 243, 0.9)',
            color: stage === 1 ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          1. Isolation
        </button>

        <button
          onClick={() => setStage(2)}
          style={{
            padding: '9px 14px',
            backgroundColor: stage === 2 ? '#5B7065' : 'rgba(250, 248, 243, 0.9)',
            color: stage === 2 ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          2. Extraction
        </button>

        <button
          onClick={() => setStage(3)}
          style={{
            padding: '9px 14px',
            backgroundColor: stage === 3 ? '#5B7065' : 'rgba(250, 248, 243, 0.9)',
            color: stage === 3 ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          3. Fluid Conduit
        </button>

        <button
          onClick={() => setStage(4)}
          style={{
            padding: '9px 14px',
            backgroundColor: stage === 4 ? '#5B7065' : 'rgba(250, 248, 243, 0.9)',
            color: stage === 4 ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          4. Packaging
        </button>
      </div>
    </div>
  );
};

export default FormulaScene3D;
