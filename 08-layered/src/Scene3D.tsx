import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const LayeredScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<'latte' | 'affogato' | 'matcha'>('latte');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x13110f);

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 4.4);

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

    // Warm Café Lighting
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.6);
    scene.add(ambientLight);

    const sunKey = new THREE.DirectionalLight(0xfffaee, 4.5);
    sunKey.position.set(4, 5, 3);
    sunKey.castShadow = true;
    scene.add(sunKey);

    const glassFill = new THREE.PointLight(0xffd59e, 3.5, 6);
    glassFill.position.set(-2, 0.5, -2);
    scene.add(glassFill);

    const drinkGroup = new THREE.Group();
    scene.add(drinkGroup);

    // 1. Crystal Fluted Glass Tumbler
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      ior: 1.5,
      roughness: 0.02,
      thickness: 1.2,
      specularIntensity: 4.5,
      clearcoat: 1.0,
      transparent: true
    });
    const glassGeo = new THREE.CylinderGeometry(0.72, 0.58, 2.0, 36, 1, true);
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.y = 0.3;
    glassMesh.castShadow = true;
    drinkGroup.add(glassMesh);

    // Glass Base Plate
    const coasterMat = new THREE.MeshStandardMaterial({ color: 0x22211e, roughness: 0.85 });
    const coaster = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.06, 32), coasterMat);
    coaster.position.y = -0.72;
    coaster.receiveShadow = true;
    drinkGroup.add(coaster);

    // 2. Stratified Liquid Layers
    // Layer 1: Base Liquid (Espresso / Matcha)
    const baseColors = {
      latte: 0x3d2010,
      affogato: 0x25140a,
      matcha: 0x3c6943
    };
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: baseColors[variant],
      transmission: 0.65,
      roughness: 0.1,
      ior: 1.34,
      transparent: true
    });
    const baseGeo = new THREE.CylinderGeometry(0.62, 0.56, 0.6, 32);
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.4;
    drinkGroup.add(baseMesh);

    // Layer 2: Mid Cream / Milk Strata
    const midColors = {
      latte: 0xf5e6d3,
      affogato: 0xfff8ee,
      matcha: 0xe5f2e8
    };
    const midMat = new THREE.MeshStandardMaterial({
      color: midColors[variant],
      roughness: 0.25,
      metalness: 0.05
    });
    const midGeo = new THREE.CylinderGeometry(0.66, 0.62, 0.65, 32);
    const midMesh = new THREE.Mesh(midGeo, midMat);
    midMesh.position.y = 0.22;
    drinkGroup.add(midMesh);

    // Layer 3: Foam Crown / Gelato Scoop
    const crownMat = new THREE.MeshStandardMaterial({
      color: 0xfffcf7,
      roughness: 0.7
    });
    const crownGeo = new THREE.SphereGeometry(0.48, 24, 16);
    crownGeo.scale(1.2, 0.6, 1.2);
    const crownMesh = new THREE.Mesh(crownGeo, crownMat);
    crownMesh.position.y = 0.75;
    drinkGroup.add(crownMesh);

    // 3. Caramel Drizzle Spiral
    const spiralPoints: THREE.Vector3[] = [];
    for (let i = 0; i < 30; i++) {
      const a = (i / 30) * Math.PI * 4;
      const r = 0.42 * (1 - i / 35);
      spiralPoints.push(new THREE.Vector3(Math.cos(a) * r, 0.85 + (i / 30) * 0.15, Math.sin(a) * r));
    }
    const spiralCurve = new THREE.CatmullRomCurve3(spiralPoints);
    const spiralMat = new THREE.MeshStandardMaterial({ color: 0xb25d1e, roughness: 0.15 });
    const drizzle = new THREE.Mesh(new THREE.TubeGeometry(spiralCurve, 32, 0.025, 8, false), spiralMat);
    drinkGroup.add(drizzle);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle drink rotation
      drinkGroup.rotation.y = elapsed * 0.25;

      // Soft cream crown breathing
      crownMesh.scale.y = 0.6 + Math.sin(elapsed * 2.0) * 0.02;

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
  }, [variant]);

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
          onClick={() => setVariant('latte')}
          style={{
            padding: '9px 16px',
            backgroundColor: variant === 'latte' ? '#B2743D' : 'rgba(250, 248, 243, 0.9)',
            color: variant === 'latte' ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Caramel Latte
        </button>

        <button
          onClick={() => setVariant('affogato')}
          style={{
            padding: '9px 16px',
            backgroundColor: variant === 'affogato' ? '#B2743D' : 'rgba(250, 248, 243, 0.9)',
            color: variant === 'affogato' ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Affogato Al Caffe
        </button>

        <button
          onClick={() => setVariant('matcha')}
          style={{
            padding: '9px 16px',
            backgroundColor: variant === 'matcha' ? '#B2743D' : 'rgba(250, 248, 243, 0.9)',
            color: variant === 'matcha' ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Matcha Cold Foam
        </button>
      </div>
    </div>
  );
};

export default LayeredScene3D;
