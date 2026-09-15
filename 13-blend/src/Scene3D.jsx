import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const BlendScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [base, setBase] = useState<'matcha' | 'dragonfruit' | 'coldbrew'>('matcha');
  const [milk, setMilk] = useState<'oat' | 'coconut'>('oat');

  const drinkColors = {
    matcha: {
      oat: 0x4a7c59,
      coconut: 0x629c73
    },
    dragonfruit: {
      oat: 0xc93b6e,
      coconut: 0xdb5887
    },
    coldbrew: {
      oat: 0x5a3d28,
      coconut: 0x7a5840
    }
  };

  const prices = {
    matcha: 7.50,
    dragonfruit: 8.25,
    coldbrew: 6.75
  };

  const activeColor = drinkColors[base][milk];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x151614);

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(-0.4, 1.2, 4.4); // Offset left to accommodate right UI panel

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

    // Fresh Wellness Lighting
    const ambientLight = new THREE.AmbientLight(0xf0fdf4, 1.6);
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(0xfffaee, 4.5);
    sun.position.set(4, 6, 3);
    sun.castShadow = true;
    scene.add(sun);

    const glassGroup = new THREE.Group();
    glassGroup.position.x = -0.5; // Centered on left side
    scene.add(glassGroup);

    // 1. Crystal Fluted Glass Tumbler
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      ior: 1.5,
      roughness: 0.03,
      thickness: 1.1,
      transparent: true
    });
    const glassGeo = new THREE.CylinderGeometry(0.7, 0.55, 1.9, 36, 1, true);
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.y = 0.2;
    glassMesh.castShadow = true;
    glassGroup.add(glassMesh);

    // Glass Base
    const coasterMat = new THREE.MeshStandardMaterial({ color: 0x242422, roughness: 0.8 });
    const coaster = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.06, 32), coasterMat);
    coaster.position.y = -0.78;
    glassGroup.add(coaster);

    // 2. Liquid Blend Material
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: activeColor,
      transmission: 0.65,
      roughness: 0.12,
      ior: 1.35,
      transparent: true
    });
    const liquidGeo = new THREE.CylinderGeometry(0.64, 0.52, 1.4, 32);
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.position.y = 0.0;
    glassGroup.add(liquidMesh);

    // Floating Ice Cubes
    const iceMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      roughness: 0.05,
      ior: 1.31,
      transparent: true
    });
    for (let i = 0; i < 3; i++) {
      const ice = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.28), iceMat);
      ice.position.set((i - 1) * 0.22, 0.45 + i * 0.08, (i % 2) * 0.15);
      ice.rotation.set(0.3 * i, 0.5 * i, 0.2);
      glassGroup.add(ice);
    }

    // Bamboo Straw
    const strawMat = new THREE.MeshStandardMaterial({ color: 0xb58f55, roughness: 0.5 });
    const straw = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.4, 16), strawMat);
    straw.rotation.z = 0.2;
    straw.position.set(0.25, 0.65, 0);
    glassGroup.add(straw);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow tumbler orbit
      glassGroup.rotation.y = Math.sin(elapsed * 0.3) * 0.15;

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
  }, [activeColor]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />

      {/* Right Synchronized Configuration Panel */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          right: 'clamp(20px, 4vw, 54px)',
          transform: 'translateY(-50%)',
          width: 'clamp(260px, 28vw, 360px)',
          backgroundColor: 'rgba(250, 248, 243, 0.92)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(17, 17, 15, 0.14)',
          borderRadius: 'var(--radius-sm)',
          padding: '24px 28px',
          color: '#11110F',
          boxShadow: '0 20px 48px -12px rgba(0,0,0,0.2)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: '600', color: '#B49A73' }}>
            Drink Configurator
          </span>
          <span style={{ fontFamily: 'var(--font-display-serif)', fontSize: '20px', fontWeight: '600' }}>
            ${prices[base].toFixed(2)}
          </span>
        </div>

        {/* Base Selector */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#767067', display: 'block', marginBottom: '8px' }}>
            Base Elixir:
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {(['matcha', 'dragonfruit', 'coldbrew'] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBase(b)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-xs)',
                  border: base === b ? '1px solid #11110F' : '1px solid rgba(17, 17, 15, 0.12)',
                  backgroundColor: base === b ? '#11110F' : 'transparent',
                  color: base === b ? '#FFFFFF' : '#11110F',
                  fontSize: '12px',
                  textAlign: 'left',
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  transition: 'all 180ms ease'
                }}
              >
                {b === 'matcha' ? 'Matcha Ceremonial Grade' : b === 'dragonfruit' ? 'Dragonfruit Adaptogen' : 'Single-Origin Cold Brew'}
              </button>
            ))}
          </div>
        </div>

        {/* Milk Selector */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#767067', display: 'block', marginBottom: '8px' }}>
            Plant-Based Milk:
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['oat', 'coconut'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMilk(m)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-xs)',
                  border: milk === m ? '1px solid #11110F' : '1px solid rgba(17, 17, 15, 0.12)',
                  backgroundColor: milk === m ? '#11110F' : 'transparent',
                  color: milk === m ? '#FFFFFF' : '#11110F',
                  fontSize: '12px',
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  transition: 'all 180ms ease'
                }}
              >
                {m} Milk
              </button>
            ))}
          </div>
        </div>

        <button
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#3A7D60',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-xs)',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Add to Order • ${prices[base].toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default BlendScene3D;
