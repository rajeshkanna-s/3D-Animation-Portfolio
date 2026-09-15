import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { soundEngine } from './audio/soundEngine.js';

type VesselType = 'ceramic' | 'glass';
type RoastType = 'ethiopia' | 'colombia' | 'sumatra';

export const RitualScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [vessel, setVessel] = useState<VesselType>('ceramic');
  const [roast, setRoast] = useState<RoastType>('ethiopia');
  const [viewMode, setViewMode] = useState<'story' | 'configurator'>('configurator');
  const [cartCount, setCartCount] = useState<number>(0);

  const roastDetails = {
    ethiopia: {
      name: 'Yirgacheffe Washed',
      notes: 'Bergamot, Jasmine, Candied Lemon',
      price: 6.80,
      liquidColor: 0x5a3118,
      cremaColor: 0xd29d66
    },
    colombia: {
      name: 'Huila Pink Bourbon',
      notes: 'Wild Strawberry, Guava, Golden Honey',
      price: 7.20,
      liquidColor: 0x4d2611,
      cremaColor: 0xdeb07c
    },
    sumatra: {
      name: 'Kerinci Natural',
      notes: 'Dark Cocoa, Clove, Cedarwood',
      price: 6.50,
      liquidColor: 0x381b0a,
      cremaColor: 0xc48c58
    }
  };

  const activeRoast = roastDetails[roast];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x131211); // Warm dark roast espresso tone

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    // Configurator mode shifts camera slightly to offset drink to the left
    if (viewMode === 'configurator') {
      camera.position.set(-0.6, 1.4, 4.2);
    } else {
      camera.position.set(0, 0.9, 3.2); // Close intimate story view
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2.0;
    controls.maxDistance = 6.5;

    // Warm artisanal coffeehouse illumination
    const ambientLight = new THREE.AmbientLight(0xffeedb, 1.6);
    scene.add(ambientLight);

    const topWarmLight = new THREE.DirectionalLight(0xffebce, 4.8);
    topWarmLight.position.set(3, 6, 4);
    topWarmLight.castShadow = true;
    scene.add(topWarmLight);

    const rimWarmLight = new THREE.DirectionalLight(0xb49a73, 2.2);
    rimWarmLight.position.set(-4, 3, -3);
    scene.add(rimWarmLight);

    const cupRootGroup = new THREE.Group();
    cupRootGroup.position.x = viewMode === 'configurator' ? -0.55 : 0;
    scene.add(cupRootGroup);

    // Artisan Stoneware Saucer Plate
    const saucerMat = new THREE.MeshStandardMaterial({
      color: 0x22211e,
      roughness: 0.85,
      metalness: 0.08
    });
    const saucer = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 0.9, 0.08, 40), saucerMat);
    saucer.position.y = -0.76;
    saucer.receiveShadow = true;
    cupRootGroup.add(saucer);

    // Vessel Groups
    const ceramicGroup = new THREE.Group();
    const glassGroup = new THREE.Group();
    cupRootGroup.add(ceramicGroup);
    cupRootGroup.add(glassGroup);

    ceramicGroup.visible = vessel === 'ceramic';
    glassGroup.visible = vessel === 'glass';

    // 1. Handcrafted Ceramic Mug Model
    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0xded6cb, // Off-white speckled clay
      roughness: 0.65,
      metalness: 0.05
    });
    const ceramicCup = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.58, 1.25, 36, 1, false), ceramicMat);
    ceramicCup.position.y = -0.1;
    ceramicCup.castShadow = true;
    ceramicGroup.add(ceramicCup);

    // Ceramic Handle
    const handleGeo = new THREE.TorusGeometry(0.35, 0.08, 16, 32, Math.PI * 0.9);
    const handle = new THREE.Mesh(handleGeo, ceramicMat);
    handle.position.set(0.72, -0.05, 0);
    handle.rotation.y = Math.PI / 2;
    handle.rotation.z = -Math.PI / 2;
    ceramicGroup.add(handle);

    // Hot Coffee Surface with Marbled Crema
    const hotLiquidMat = new THREE.MeshStandardMaterial({
      color: activeRoast.cremaColor,
      roughness: 0.35,
      metalness: 0.1
    });
    const hotLiquid = new THREE.Mesh(new THREE.CircleGeometry(0.66, 32), hotLiquidMat);
    hotLiquid.rotation.x = -Math.PI / 2;
    hotLiquid.position.y = 0.44;
    ceramicGroup.add(hotLiquid);

    // Procedural Steam Particles
    const steamCount = 45;
    const steamGeo = new THREE.BufferGeometry();
    const steamPos = new Float32Array(steamCount * 3);
    const steamVel: number[] = [];

    for (let i = 0; i < steamCount; i++) {
      steamPos[i * 3 + 0] = (Math.random() - 0.5) * 0.4;
      steamPos[i * 3 + 1] = 0.5 + Math.random() * 0.8;
      steamPos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      steamVel.push(0.008 + Math.random() * 0.012);
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));

    const steamMat = new THREE.PointsMaterial({
      color: 0xffeedd,
      size: 0.14,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    ceramicGroup.add(steamParticles);

    // 2. Fluted Iced Glass Tumbler Model
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      ior: 1.5,
      roughness: 0.02,
      thickness: 1.2,
      transparent: true
    });
    const glassTumbler = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.55, 1.85, 36, 1, true), glassMat);
    glassTumbler.position.y = 0.18;
    glassTumbler.castShadow = true;
    glassGroup.add(glassTumbler);

    // Iced Liquid Body
    const icedLiquidMat = new THREE.MeshPhysicalMaterial({
      color: activeRoast.liquidColor,
      transmission: 0.72,
      roughness: 0.1,
      ior: 1.34,
      transparent: true
    });
    const icedLiquid = new THREE.Mesh(new THREE.CylinderGeometry(0.63, 0.52, 1.45, 32), icedLiquidMat);
    icedLiquid.position.y = 0.05;
    glassGroup.add(icedLiquid);

    // Fluted Glass Cold Foam Crown
    const foamMat = new THREE.MeshStandardMaterial({ color: 0xfffbf5, roughness: 0.85 });
    const foamCrown = new THREE.Mesh(new THREE.CylinderGeometry(0.64, 0.63, 0.25, 32), foamMat);
    foamCrown.position.y = 0.88;
    glassGroup.add(foamCrown);

    // Ice Cubes inside Glass
    const iceMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.96,
      roughness: 0.04,
      ior: 1.31,
      transparent: true
    });
    for (let i = 0; i < 3; i++) {
      const iceCube = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), iceMat);
      iceCube.position.set((i - 1) * 0.2, 0.4 + i * 0.12, (i % 2) * 0.1);
      iceCube.rotation.set(0.3 * i, 0.6 * i, 0.1);
      glassGroup.add(iceCube);
    }

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle cup breathing orbit
      cupRootGroup.rotation.y = Math.sin(elapsed * 0.25) * 0.14;

      // Animate steam for hot cup
      if (vessel === 'ceramic') {
        const positions = steamGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < steamCount; i++) {
          positions[i * 3 + 1] += steamVel[i];
          positions[i * 3 + 0] += Math.sin(elapsed * 2 + i) * 0.002;
          if (positions[i * 3 + 1] > 1.8) {
            positions[i * 3 + 1] = 0.45;
            positions[i * 3 + 0] = (Math.random() - 0.5) * 0.3;
          }
        }
        steamGeo.attributes.position.needsUpdate = true;
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
  }, [vessel, roast, viewMode]);

  const handleVesselChange = (newVessel: VesselType) => {
    setVessel(newVessel);
    if (newVessel === 'ceramic') {
      soundEngine.play('steam');
    } else {
      soundEngine.play('glass');
    }
  };

  const handleRoastChange = (newRoast: RoastType) => {
    setRoast(newRoast);
    soundEngine.play('click');
  };

  const toggleViewMode = () => {
    soundEngine.play('whoosh');
    setViewMode(viewMode === 'configurator' ? 'story' : 'configurator');
  };

  const handleAddToCart = () => {
    soundEngine.play('metal');
    setCartCount(cartCount + 1);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />

      {/* Top Left Perspective Toggle */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          left: 'clamp(16px, 3vw, 40px)',
          display: 'flex',
          gap: '10px',
          zIndex: 10
        }}
      >
        <button
          onClick={toggleViewMode}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            backgroundColor: viewMode === 'story' ? '#FAF8F3' : 'rgba(20, 22, 24, 0.7)',
            color: viewMode === 'story' ? '#11110F' : '#FAF8F3',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.15)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 200ms ease'
          }}
        >
          {viewMode === 'story' ? 'Layered Pour Mode' : 'Drink Studio Mode'}
        </button>

        {cartCount > 0 && (
          <div
            style={{
              padding: '8px 14px',
              borderRadius: '20px',
              backgroundColor: '#B49A73',
              color: '#11110F',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Bag ({cartCount})
          </div>
        )}
      </div>

      {/* Synchronized E-Commerce Ordering Panel */}
      {viewMode === 'configurator' && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: 'clamp(20px, 4vw, 54px)',
            transform: 'translateY(-50%)',
            width: 'clamp(280px, 28vw, 380px)',
            backgroundColor: 'rgba(250, 248, 243, 0.94)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(17, 17, 15, 0.12)',
            borderRadius: 'var(--radius-sm)',
            padding: '28px 30px',
            color: '#11110F',
            boxShadow: '0 24px 54px -12px rgba(0,0,0,0.3)',
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: '600', color: '#9C6233' }}>
                Artisanal Batch
              </span>
              <h3 style={{ fontFamily: 'var(--font-display-serif)', fontSize: '22px', margin: '4px 0 0 0', fontWeight: '500' }}>
                {activeRoast.name}
              </h3>
            </div>
            <span style={{ fontFamily: 'var(--font-display-serif)', fontSize: '22px', fontWeight: '600', color: '#11110F' }}>
              ${activeRoast.price.toFixed(2)}
            </span>
          </div>

          <p style={{ fontSize: '12px', color: '#686259', lineHeight: '1.5', margin: '0 0 20px 0' }}>
            Tasting Notes: <strong style={{ color: '#11110F' }}>{activeRoast.notes}</strong>
          </p>

          {/* Vessel Selection (Hot Clay vs Iced Glass) */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#767067', display: 'block', marginBottom: '8px' }}>
              Vessel Presentation:
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handleVesselChange('ceramic')}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-xs)',
                  border: vessel === 'ceramic' ? '1px solid #11110F' : '1px solid rgba(17, 17, 15, 0.14)',
                  backgroundColor: vessel === 'ceramic' ? '#11110F' : 'transparent',
                  color: vessel === 'ceramic' ? '#FFFFFF' : '#11110F',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 180ms ease'
                }}
              >
                Hot Ceramic Mug
              </button>
              <button
                onClick={() => handleVesselChange('glass')}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-xs)',
                  border: vessel === 'glass' ? '1px solid #11110F' : '1px solid rgba(17, 17, 15, 0.14)',
                  backgroundColor: vessel === 'glass' ? '#11110F' : 'transparent',
                  color: vessel === 'glass' ? '#FFFFFF' : '#11110F',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 180ms ease'
                }}
              >
                Fluted Iced Glass
              </button>
            </div>
          </div>

          {/* Roast Origin Selection */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#767067', display: 'block', marginBottom: '8px' }}>
              Select Origin:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(['ethiopia', 'colombia', 'sumatra'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoastChange(r)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-xs)',
                    border: roast === r ? '1px solid #11110F' : '1px solid rgba(17, 17, 15, 0.12)',
                    backgroundColor: roast === r ? 'rgba(17, 17, 15, 0.07)' : 'transparent',
                    color: '#11110F',
                    fontSize: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 180ms ease'
                  }}
                >
                  <span style={{ fontWeight: roast === r ? '600' : '400' }}>
                    {roastDetails[r].name}
                  </span>
                  <span style={{ color: '#767067' }}>
                    ${roastDetails[r].price.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#9C6233',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-xs)',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 200ms ease'
            }}
          >
            Add to Ritual • ${activeRoast.price.toFixed(2)}
          </button>
        </div>
      )}
    </div>
  );
};

export default RitualScene3D;
