import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const AltitudeScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [explodedFloors, setExplodedFloors] = useState(false);
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isNight ? 0x0b0d13 : 0x1a1c22);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(4.2, 3.8, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isNight ? 1.5 : 1.2;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3.5;
    controls.maxDistance = 12.0;

    // Lighting (Sunlight vs Twilight)
    const ambientLight = new THREE.AmbientLight(isNight ? 0x223355 : 0xffeedd, isNight ? 1.0 : 1.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(isNight ? 0x7799dd : 0xfff0d0, isNight ? 1.8 : 4.5);
    sunLight.position.set(6, 9, 5);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    // Site Ground Plate
    const siteMat = new THREE.MeshStandardMaterial({
      color: isNight ? 0x141720 : 0x2a2c33,
      roughness: 0.8
    });
    const siteGeo = new THREE.BoxGeometry(6, 0.2, 6);
    const siteMesh = new THREE.Mesh(siteGeo, siteMat);
    siteMesh.position.y = -0.1;
    siteMesh.receiveShadow = true;
    buildingGroup.add(siteMesh);

    // Swimming Pool Caustics Plate
    const poolMat = new THREE.MeshPhysicalMaterial({
      color: 0x1d70b8,
      roughness: 0.1,
      transmission: 0.8,
      ior: 1.33
    });
    const poolMesh = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.05, 1.2), poolMat);
    poolMesh.position.set(1.4, 0.02, 1.8);
    buildingGroup.add(poolMesh);

    // Tower Structure: 10 Parametric Floor Slabs with Glass Curtain Walls
    const floorMeshes: THREE.Group[] = [];
    const floorCount = 10;
    const slabHeight = 0.28;
    const slabWidth = 1.6;
    const slabDepth = 1.4;

    const slabMat = new THREE.MeshStandardMaterial({
      color: isNight ? 0x333640 : 0xe0e3eb,
      metalness: 0.1,
      roughness: 0.35
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: isNight ? 0x88bbff : 0x708a9f,
      transmission: 0.75,
      ior: 1.52,
      roughness: 0.05,
      metalness: 0.15,
      transparent: true,
      opacity: 0.85
    });

    for (let i = 0; i < floorCount; i++) {
      const floorGroup = new THREE.Group();
      
      // Concrete/Stone Slab
      const slab = new THREE.Mesh(new THREE.BoxGeometry(slabWidth, 0.05, slabDepth), slabMat);
      slab.castShadow = true;
      slab.receiveShadow = true;
      floorGroup.add(slab);

      // Glass Curtain Wall Interior
      const glass = new THREE.Mesh(new THREE.BoxGeometry(slabWidth * 0.92, slabHeight * 0.9, slabDepth * 0.92), glassMat);
      glass.position.y = slabHeight / 2;
      floorGroup.add(glass);

      // Interior warm light
      if (isNight) {
        const intLight = new THREE.PointLight(0xffb044, 0.8, 1.5);
        intLight.position.set(0, slabHeight / 2, 0);
        floorGroup.add(intLight);
      }

      floorGroup.position.y = i * slabHeight;
      buildingGroup.add(floorGroup);
      floorMeshes.push(floorGroup);
    }

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Subtle slow site rotation
      buildingGroup.rotation.y = Math.sin(elapsed * 0.2) * 0.08;

      // Exploded Floor Stacking
      floorMeshes.forEach((fl, idx) => {
        const targetY = explodedFloors 
          ? idx * (slabHeight + 0.32) 
          : idx * slabHeight;
        fl.position.y = THREE.MathUtils.lerp(fl.position.y, targetY, 0.08);
      });

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
  }, [explodedFloors, isNight]);

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
          onClick={() => setExplodedFloors(!explodedFloors)}
          style={{
            padding: '10px 18px',
            backgroundColor: explodedFloors ? '#536878' : 'rgba(250, 248, 243, 0.9)',
            color: explodedFloors ? '#FFFFFF' : '#11110F',
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
          {explodedFloors ? 'Collapse Tower' : 'Explode Floor Stack'}
        </button>

        <button
          onClick={() => setIsNight(!isNight)}
          style={{
            padding: '10px 18px',
            backgroundColor: isNight ? '#B49A73' : 'rgba(250, 248, 243, 0.9)',
            color: isNight ? '#FFFFFF' : '#11110F',
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
          {isNight ? 'Daylight Mode' : 'Dusk / Night View'}
        </button>
      </div>
    </div>
  );
};
