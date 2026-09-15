import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const VerdantLabScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeaves, setShowLeaves] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e1712);

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 4.5);

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

    // Lighting (Lush botanical backlight & soft key)
    const ambientLight = new THREE.AmbientLight(0xddeedd, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.8);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7da885, 4.2);
    rimLight.position.set(-3, -2, -3);
    scene.add(rimLight);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Frosted Glass Cosmetic Flacon
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xebf5ee,
      transmission: 0.88,
      ior: 1.52,
      roughness: 0.18, // Frosted glass finish
      thickness: 1.2,
      specularIntensity: 3.5,
      clearcoat: 0.8,
      transparent: true
    });
    const bottleGeo = new THREE.CylinderGeometry(0.55, 0.58, 1.6, 36);
    const bottleMesh = new THREE.Mesh(bottleGeo, glassMat);
    bottleMesh.position.y = 0.4;
    bottleMesh.castShadow = true;
    masterGroup.add(bottleMesh);

    // Inner Translucent Botanical Serum
    const serumMat = new THREE.MeshPhysicalMaterial({
      color: 0x5b9970,
      transmission: 0.7,
      roughness: 0.1,
      ior: 1.38,
      transparent: true
    });
    const serumGeo = new THREE.CylinderGeometry(0.48, 0.5, 1.2, 32);
    const serumMesh = new THREE.Mesh(serumGeo, serumMat);
    serumMesh.position.y = 0.25;
    masterGroup.add(serumMesh);

    // Bamboo Dropper Cap
    const capMat = new THREE.MeshStandardMaterial({ color: 0x3d3025, roughness: 0.7 });
    const capMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.5, 24), capMat);
    capMesh.position.y = 1.45;
    masterGroup.add(capMesh);

    // Glass Pipette Teat
    const teatMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.6 });
    const teatMesh = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16), teatMat);
    teatMesh.position.y = 1.75;
    masterGroup.add(teatMesh);

    // 2. Glass Laboratory Petri Dish at Base
    const dishMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      roughness: 0.05,
      ior: 1.5
    });
    const dishMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.35, 0.08, 48), dishMat);
    dishMesh.position.y = -0.45;
    dishMesh.receiveShadow = true;
    masterGroup.add(dishMesh);

    // Liquid surface inside dish
    const rippleMat = new THREE.MeshPhysicalMaterial({
      color: 0x6ca37d,
      transmission: 0.8,
      roughness: 0.05,
      ior: 1.34
    });
    const rippleMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 0.02, 32), rippleMat);
    rippleMesh.position.y = -0.41;
    masterGroup.add(rippleMesh);

    // 3. Descending Serum Droplet
    const dropletMat = new THREE.MeshPhysicalMaterial({
      color: 0x88cc9e,
      transmission: 0.9,
      roughness: 0.02,
      ior: 1.4
    });
    const dropletMesh = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), dropletMat);
    dropletMesh.position.set(0.65, 0.3, 0.2);
    masterGroup.add(dropletMesh);

    // 4. Orbiting Botanical Leaves
    const leavesGroup = new THREE.Group();
    masterGroup.add(leavesGroup);

    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x3d7a4f,
      roughness: 0.45,
      side: THREE.DoubleSide
    });

    const leafCount = 8;
    const leaves: { mesh: THREE.Mesh; angle: number; speed: number; rad: number; yBase: number }[] = [];

    for (let i = 0; i < leafCount; i++) {
      const leafGeo = new THREE.ConeGeometry(0.12, 0.42, 6);
      leafGeo.scale(1, 1, 0.15); // Flat leaf shape
      const leaf = new THREE.Mesh(leafGeo, leafMat);

      const angle = (i / leafCount) * Math.PI * 2;
      const rad = 1.3 + Math.random() * 0.4;
      const yBase = -0.1 + Math.random() * 0.8;

      leaf.position.set(Math.cos(angle) * rad, yBase, Math.sin(angle) * rad);
      leavesGroup.add(leaf);

      leaves.push({
        mesh: leaf,
        angle,
        speed: 0.4 + Math.random() * 0.3,
        rad,
        yBase
      });
    }

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow bottle rotation
      bottleMesh.rotation.y = elapsed * 0.2;
      serumMesh.rotation.y = elapsed * 0.2;

      // Descending droplet loop
      dropletMesh.position.y = -0.38 + ((1.2 - (elapsed * 0.8 % 1.2)) % 1.2);
      const dropletScale = 0.5 + (1 - (dropletMesh.position.y + 0.38) / 1.2) * 0.8;
      dropletMesh.scale.setScalar(dropletScale);

      // Ripple pulse when droplet hits
      rippleMesh.scale.y = 1.0 + Math.sin(elapsed * 5.0) * 0.2;

      // Orbiting botanical leaves
      leaves.forEach((l) => {
        l.angle += l.speed * 0.01;
        l.mesh.position.x = Math.cos(l.angle) * l.rad;
        l.mesh.position.z = Math.sin(l.angle) * l.rad;
        l.mesh.position.y = l.yBase + Math.sin(elapsed * 1.5 + l.angle) * 0.08;
        l.mesh.rotation.y = -l.angle;
        l.mesh.rotation.x = Math.sin(elapsed + l.angle) * 0.2;
      });

      leavesGroup.visible = showLeaves;

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
  }, [showLeaves]);

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
          gap: '12px'
        }}
      >
        <button
          onClick={() => setShowLeaves(!showLeaves)}
          style={{
            padding: '10px 18px',
            backgroundColor: showLeaves ? '#7D9078' : 'rgba(250, 248, 243, 0.9)',
            color: showLeaves ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontWeight: '600',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            cursor: 'pointer',
            transition: 'all 200ms ease'
          }}
        >
          {showLeaves ? 'Hide Botanical Elements' : 'Show Botanical Extract'}
        </button>
      </div>
    </div>
  );
};

export default VerdantLabScene3D;
