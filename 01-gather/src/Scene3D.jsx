import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const GatherScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [exploded, setExploded] = useState(false);
  const [activeIngredient, setActiveIngredient] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x161513);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.minDistance = 2.5;
    controls.maxDistance = 8.0;

    // Lighting (Warm candlelight & ambient restaurant mood)
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.4);
    scene.add(ambientLight);

    const candleLight = new THREE.PointLight(0xffaa44, 3.5, 10);
    candleLight.position.set(-2, 1.8, 1.5);
    scene.add(candleLight);

    const keySpot = new THREE.SpotLight(0xfff5e6, 4.2, 15, Math.PI / 4, 0.3);
    keySpot.position.set(2, 5, 3);
    keySpot.castShadow = true;
    scene.add(keySpot);

    const masterTableGroup = new THREE.Group();
    scene.add(masterTableGroup);

    // 1. Walnut Tabletop Surface
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x3d2817,
      roughness: 0.6,
      metalness: 0.05
    });
    const tableGeo = new THREE.CylinderGeometry(4.5, 4.5, 0.2, 48);
    const tableMesh = new THREE.Mesh(tableGeo, tableMat);
    tableMesh.position.y = -0.1;
    tableMesh.receiveShadow = true;
    masterTableGroup.add(tableMesh);

    // 2. Folded Organic Linen Napkin
    const linenMat = new THREE.MeshStandardMaterial({
      color: 0xdfd9ce,
      roughness: 0.9,
      metalness: 0.0
    });
    const linenGeo = new THREE.BoxGeometry(0.85, 0.04, 1.2);
    const linenMesh = new THREE.Mesh(linenGeo, linenMat);
    linenMesh.position.set(-1.4, 0.02, 0.3);
    linenMesh.rotation.y = 0.15;
    linenMesh.castShadow = true;
    masterTableGroup.add(linenMesh);

    // 3. Handcrafted Ceramic Stoneware Plate
    const ceramicMat = new THREE.MeshPhysicalMaterial({
      color: 0xe8e2d8,
      roughness: 0.28,
      metalness: 0.05,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15
    });
    const plateGeo = new THREE.CylinderGeometry(1.4, 1.1, 0.12, 48);
    const plateMesh = new THREE.Mesh(plateGeo, ceramicMat);
    plateMesh.position.y = 0.06;
    plateMesh.receiveShadow = true;
    plateMesh.castShadow = true;
    masterTableGroup.add(plateMesh);

    // Inner plate rim depression
    const innerRimGeo = new THREE.CylinderGeometry(1.05, 0.95, 0.04, 48);
    const innerRimMat = new THREE.MeshStandardMaterial({ color: 0xded6c8, roughness: 0.35 });
    const innerPlate = new THREE.Mesh(innerRimGeo, innerRimMat);
    innerPlate.position.y = 0.11;
    masterTableGroup.add(innerPlate);

    // 4. Plated Culinary Ingredients Group
    const ingredientsGroup = new THREE.Group();
    masterTableGroup.add(ingredientsGroup);

    // Main Entrée (Glazed Heirloom Beet / Confit)
    const entreeMat = new THREE.MeshPhysicalMaterial({
      color: 0x82212f,
      roughness: 0.25,
      clearcoat: 1.0,
      metalness: 0.1
    });
    const entreeGeo = new THREE.SphereGeometry(0.36, 32, 24);
    entreeGeo.scale(1.2, 0.6, 0.9);
    const entreeMesh = new THREE.Mesh(entreeGeo, entreeMat);
    entreeMesh.position.set(0, 0.24, 0);
    entreeMesh.castShadow = true;
    ingredientsGroup.add(entreeMesh);

    // Garnish Herbs (Emerald Herb Sprigs)
    const herbMat = new THREE.MeshStandardMaterial({ color: 0x3d703d, roughness: 0.5 });
    const herbLeaves: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const leafGeo = new THREE.ConeGeometry(0.08, 0.28, 8);
      const leaf = new THREE.Mesh(leafGeo, herbMat);
      const ang = (i / 6) * Math.PI * 2;
      leaf.position.set(Math.cos(ang) * 0.45, 0.22, Math.sin(ang) * 0.45);
      leaf.rotation.x = Math.PI / 2.5;
      leaf.rotation.z = -ang;
      ingredientsGroup.add(leaf);
      herbLeaves.push(leaf);
    }

    // Sauce Emulsion Droplets (Heirloom reduction)
    const sauceMat = new THREE.MeshPhysicalMaterial({ color: 0x3b1016, roughness: 0.1, clearcoat: 1.0 });
    const sauceDrops: THREE.Mesh[] = [];
    const sauceCoords = [
      [0.65, 0.14, 0.35],
      [0.78, 0.14, -0.15],
      [-0.55, 0.14, 0.55],
      [-0.72, 0.14, -0.3],
      [0.2, 0.14, -0.7]
    ];
    sauceCoords.forEach(([x, y, z]) => {
      const drop = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.02, 16), sauceMat);
      drop.position.set(x, y, z);
      ingredientsGroup.add(drop);
      sauceDrops.push(drop);
    });

    // 5. Polished Silver Cutlery & Wine Glass
    const silverMat = new THREE.MeshStandardMaterial({ color: 0xe0e5ea, metalness: 0.95, roughness: 0.12 });
    const forkHandle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 1.1), silverMat);
    forkHandle.position.set(-1.8, 0.05, 0.1);
    masterTableGroup.add(forkHandle);

    const knifeHandle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 1.15), silverMat);
    knifeHandle.position.set(1.8, 0.05, 0.1);
    masterTableGroup.add(knifeHandle);

    // Glass Stemware
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      ior: 1.5,
      roughness: 0.02,
      thickness: 0.5,
      transparent: true
    });
    const glassGeo = new THREE.CylinderGeometry(0.35, 0.28, 0.8, 24, 1, true);
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.set(1.6, 0.55, -1.1);
    masterTableGroup.add(glassMesh);

    // Animation variables
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle table rotation if not dragging
      masterTableGroup.rotation.y = Math.sin(elapsed * 0.25) * 0.12;

      // Exploded View Dynamics
      if (exploded) {
        entreeMesh.position.y = THREE.MathUtils.lerp(entreeMesh.position.y, 0.85, 0.08);
        herbLeaves.forEach((leaf, idx) => {
          leaf.position.y = THREE.MathUtils.lerp(leaf.position.y, 1.25 + idx * 0.06, 0.08);
          leaf.scale.setScalar(1.2);
        });
      } else {
        entreeMesh.position.y = THREE.MathUtils.lerp(entreeMesh.position.y, 0.24, 0.08);
        herbLeaves.forEach((leaf) => {
          leaf.position.y = THREE.MathUtils.lerp(leaf.position.y, 0.22, 0.08);
          leaf.scale.setScalar(1.0);
        });
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
  }, [exploded]);

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
          onClick={() => setExploded(!exploded)}
          style={{
            padding: '10px 18px',
            backgroundColor: exploded ? '#B49A73' : 'rgba(250, 248, 243, 0.9)',
            color: exploded ? '#FFFFFF' : '#11110F',
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
          {exploded ? 'Reassemble Plated Dish' : 'Explode Ingredients'}
        </button>
      </div>
    </div>
  );
};

export default GatherScene3D;
