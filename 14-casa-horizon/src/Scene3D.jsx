import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { soundEngine } from './audio/soundEngine.js';

type HotspotKey = 'overview' | 'terrace' | 'pavilion' | 'suite';

export const CasaHorizonScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<HotspotKey>('overview');
  const [dollhouseSeparation, setDollhouseSeparation] = useState<boolean>(false);
  const [goldenHour, setGoldenHour] = useState<boolean>(false);

  // References to animate camera and upper floor
  const targetCamPos = useRef(new THREE.Vector3(5.5, 3.8, 6.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.8, 0));
  const upperFloorGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const bgColor = goldenHour ? new THREE.Color(0x1a1412) : new THREE.Color(0x13171b);
    scene.background = bgColor;
    scene.fog = new THREE.FogExp2(bgColor, 0.045);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.copy(targetCamPos.current);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2.5;
    controls.maxDistance = 14.0;
    controls.target.copy(targetLookAt.current);

    // Architectural Mediterranean Lighting
    const ambientLight = new THREE.AmbientLight(
      goldenHour ? 0xffccaa : 0xd0e4f2,
      goldenHour ? 1.6 : 2.0
    );
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(
      goldenHour ? 0xff8c42 : 0xfffaed,
      goldenHour ? 5.5 : 4.2
    );
    sun.position.set(goldenHour ? 8 : 6, goldenHour ? 3 : 7, goldenHour ? 4 : 4);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 25;
    sun.shadow.camera.left = -6;
    sun.shadow.camera.right = 6;
    sun.shadow.camera.top = 6;
    sun.shadow.camera.bottom = -6;
    scene.add(sun);

    // Subtle blue fill light representing the Mediterranean sea bounce
    const seaBounceLight = new THREE.DirectionalLight(0x4a8bb2, 1.4);
    seaBounceLight.position.set(-5, -2, -3);
    scene.add(seaBounceLight);

    // Base Villa Group
    const villaGroup = new THREE.Group();
    scene.add(villaGroup);

    // 1. Cliff / Bedrock Base
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x3d3733,
      roughness: 0.95,
      metalness: 0.05,
      flatShading: true
    });
    const rockBase = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.8, 1.4, 12), rockMat);
    rockBase.position.y = -0.7;
    rockBase.receiveShadow = true;
    villaGroup.add(rockBase);

    // 2. Main Travertine Terrace Slab
    const travertineMat = new THREE.MeshStandardMaterial({
      color: 0xe5dfd3,
      roughness: 0.72,
      metalness: 0.04
    });
    const terrace = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.2, 4.6), travertineMat);
    terrace.position.set(0.2, 0.05, 0.3);
    terrace.receiveShadow = true;
    terrace.castShadow = true;
    villaGroup.add(terrace);

    // 3. Cantilevered Infinity Pool
    const poolGroup = new THREE.Group();
    poolGroup.position.set(1.4, 0.1, 1.4);

    // Pool Basin
    const poolBasinMat = new THREE.MeshStandardMaterial({ color: 0x163442, roughness: 0.4 });
    const poolBasin = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.22, 1.4), poolBasinMat);
    poolGroup.add(poolBasin);

    // Water Surface (translucent turquoise with refraction)
    const waterMat = new THREE.MeshPhysicalMaterial({
      color: goldenHour ? 0x226b7d : 0x1a8fa6,
      transmission: 0.88,
      roughness: 0.06,
      ior: 1.333,
      transparent: true,
      reflectivity: 0.8
    });
    const waterGeo = new THREE.PlaneGeometry(2.9, 1.3, 24, 24);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.position.y = 0.12;
    poolGroup.add(waterMesh);
    villaGroup.add(poolGroup);

    // 4. Ground Floor Glass Living Pavilion
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      roughness: 0.04,
      ior: 1.52,
      transparent: true
    });
    const bronzeFrameMat = new THREE.MeshStandardMaterial({ color: 0x1d1b19, roughness: 0.4, metalness: 0.8 });

    // Glass walls
    const pavilionGlass = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.5, 2.8), glassMat);
    pavilionGlass.position.set(-1.0, 0.9, -0.4);
    villaGroup.add(pavilionGlass);

    // Bronze columns at corners
    for (const [x, z] of [[-2.75, -1.75], [-2.75, 0.95], [0.75, -1.75], [0.75, 0.95]]) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.5, 12), bronzeFrameMat);
      col.position.set(x, 0.9, z);
      col.castShadow = true;
      villaGroup.add(col);
    }

    // Interior Warm Limestone Core / Fireplace partition
    const coreMat = new THREE.MeshStandardMaterial({ color: 0xcec6b8, roughness: 0.8 });
    const coreWall = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.48, 1.8), coreMat);
    coreWall.position.set(-1.2, 0.9, -0.4);
    coreWall.castShadow = true;
    coreWall.receiveShadow = true;
    villaGroup.add(coreWall);

    // Minimalist interior sofa & table
    const fabricMat = new THREE.MeshStandardMaterial({ color: 0xf2ece4, roughness: 0.9 });
    const sofa = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.35, 0.6), fabricMat);
    sofa.position.set(-0.6, 0.35, -0.4);
    villaGroup.add(sofa);

    // 5. Upper Floor Suite & Cantilevered Roof (Dollhouse Separation Group)
    const upperFloorGroup = new THREE.Group();
    upperFloorGroupRef.current = upperFloorGroup;
    villaGroup.add(upperFloorGroup);

    // Mid Floor Inter-Level Slab
    const upperSlab = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.2, 3.4), travertineMat);
    upperSlab.position.set(-0.8, 1.75, -0.4);
    upperSlab.castShadow = true;
    upperSlab.receiveShadow = true;
    upperFloorGroup.add(upperSlab);

    // Upper Master Suite Pavilion
    const upperGlass = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.3, 2.2), glassMat);
    upperGlass.position.set(-0.8, 2.5, -0.4);
    upperFloorGroup.add(upperGlass);

    // Upper Suite Timber Louver Finishes
    const louverMat = new THREE.MeshStandardMaterial({ color: 0x7c5a3a, roughness: 0.6 });
    for (let i = 0; i < 6; i++) {
      const louver = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.3, 0.12), louverMat);
      louver.position.set(-2.38, 2.5, -1.2 + i * 0.4);
      upperFloorGroup.add(louver);
    }

    // Deep Cantilever Overhang Roof
    const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.2, 3.8), travertineMat);
    roofSlab.position.set(-0.8, 3.25, -0.4);
    roofSlab.castShadow = true;
    roofSlab.receiveShadow = true;
    upperFloorGroup.add(roofSlab);

    // 6. Sculptural Mediterranean Landscape (Cypress & Planters)
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x3d3024, roughness: 0.9 });
    const foliageMat = new THREE.MeshStandardMaterial({
      color: goldenHour ? 0x485c36 : 0x2e4a2c,
      roughness: 0.85
    });

    const cypressPositions = [
      [-2.6, 0.15, 1.8],
      [-2.9, 0.15, 1.3],
      [2.7, 0.15, -1.6]
    ];

    cypressPositions.forEach(([tx, ty, tz]) => {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.8, 8), treeTrunkMat);
      trunk.position.set(tx, ty + 0.4, tz);
      trunk.castShadow = true;
      villaGroup.add(trunk);

      const foliage = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.8, 8), foliageMat);
      foliage.position.set(tx, ty + 1.4, tz);
      foliage.castShadow = true;
      villaGroup.add(foliage);
    });

    // Sun Loungers by Pool
    const loungerMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
    for (let i = 0; i < 2; i++) {
      const lounger = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 1.1), loungerMat);
      lounger.position.set(0.1 + i * 0.7, 0.2, 1.5);
      lounger.castShadow = true;
      villaGroup.add(lounger);
    }

    // Target position for dollhouse separation
    let currentSeparationY = 0;

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle water ripple animation
      const pos = waterGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        pos.setZ(i, Math.sin(u * 5 + elapsed * 2.2) * 0.015 + Math.cos(v * 6 + elapsed * 1.8) * 0.012);
      }
      waterGeo.computeVertexNormals();
      pos.needsUpdate = true;

      // Smooth camera interpolation towards active hotspot target
      camera.position.lerp(targetCamPos.current, 0.04);
      controls.target.lerp(targetLookAt.current, 0.04);

      // Smooth dollhouse upper floor elevation
      const targetSep = dollhouseSeparation ? 1.4 : 0.0;
      currentSeparationY = THREE.MathUtils.lerp(currentSeparationY, targetSep, 0.06);
      if (upperFloorGroupRef.current) {
        upperFloorGroupRef.current.position.y = currentSeparationY;
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
  }, [dollhouseSeparation, goldenHour]);

  const handleHotspotSelect = (key: HotspotKey) => {
    setActiveHotspot(key);
    soundEngine.play('whoosh');

    switch (key) {
      case 'overview':
        targetCamPos.current.set(5.5, 3.8, 6.2);
        targetLookAt.current.set(0, 0.8, 0);
        break;
      case 'terrace':
        targetCamPos.current.set(2.8, 1.2, 3.2);
        targetLookAt.current.set(1.4, 0.4, 1.2);
        break;
      case 'pavilion':
        targetCamPos.current.set(-2.8, 1.4, 1.6);
        targetLookAt.current.set(-0.8, 0.9, -0.4);
        break;
      case 'suite':
        targetCamPos.current.set(0.2, 4.2, 3.8);
        targetLookAt.current.set(-0.8, 2.2, -0.4);
        break;
    }
  };

  const toggleDollhouse = () => {
    soundEngine.play('click');
    setDollhouseSeparation(!dollhouseSeparation);
  };

  const toggleAtmosphere = () => {
    soundEngine.play('click');
    setGoldenHour(!goldenHour);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />

      {/* Top Left Hotspot Tour Selector */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          left: 'clamp(16px, 3vw, 40px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 10
        }}
      >
        <span
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            fontWeight: '600',
            color: '#B49A73',
            marginBottom: '4px'
          }}
        >
          Architectural Walkthrough
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            { key: 'overview', label: '01 Aerial Overview' },
            { key: 'terrace', label: '02 Infinity Terrace' },
            { key: 'pavilion', label: '03 Living Pavilion' },
            { key: 'suite', label: '04 Master Suite' }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => handleHotspotSelect(item.key as HotspotKey)}
              style={{
                padding: '7px 14px',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: activeHotspot === item.key ? 'rgba(250, 248, 243, 0.95)' : 'rgba(20, 22, 24, 0.65)',
                color: activeHotspot === item.key ? '#11110F' : '#E8E5DF',
                backdropFilter: 'blur(12px)',
                border: activeHotspot === item.key ? '1px solid #FAF8F3' : '1px solid rgba(255,255,255,0.12)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 200ms ease'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Floating Control Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          backgroundColor: 'rgba(20, 22, 24, 0.75)',
          backdropFilter: 'blur(16px)',
          padding: '8px 16px',
          borderRadius: '40px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          zIndex: 10
        }}
      >
        <button
          onClick={toggleDollhouse}
          style={{
            padding: '8px 16px',
            borderRadius: '24px',
            backgroundColor: dollhouseSeparation ? '#B49A73' : 'transparent',
            color: dollhouseSeparation ? '#11110F' : '#FAF8F3',
            border: 'none',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 200ms ease'
          }}
        >
          {dollhouseSeparation ? 'Assemble Floors' : 'Dollhouse Roof Lift'}
        </button>

        <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '4px 0' }} />

        <button
          onClick={toggleAtmosphere}
          style={{
            padding: '8px 16px',
            borderRadius: '24px',
            backgroundColor: goldenHour ? '#D97736' : 'transparent',
            color: goldenHour ? '#FFFFFF' : '#FAF8F3',
            border: 'none',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 200ms ease'
          }}
        >
          {goldenHour ? 'Golden Hour 19:40' : 'Midday 12:00'}
        </button>
      </div>
    </div>
  );
};

export default CasaHorizonScene3D;
