import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const KineticScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [exploded, setExploded] = useState(false);
  const [colorway, setColorway] = useState<'red' | 'black' | 'lime'>('red');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121210);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 4.8);

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
    controls.minDistance = 2.8;
    controls.maxDistance = 7.0;

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    keyLight.position.set(4, 5, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xdde8ff, 3.2);
    rimLight.position.set(-4, -1, -3);
    scene.add(rimLight);

    const shoeGroup = new THREE.Group();
    shoeGroup.rotation.y = -0.5;
    shoeGroup.rotation.x = 0.2;
    scene.add(shoeGroup);

    // Color definitions
    const colors = {
      red: { upper: 0xd72638, sole: 0xf5f5f5, accent: 0x11110f },
      black: { upper: 0x1a1a1a, sole: 0x2e2e2e, accent: 0xd72638 },
      lime: { upper: 0x9ee03a, sole: 0x1a1a1a, accent: 0xffffff }
    };
    const activeColor = colors[colorway];

    // 1. Carbon Fiber Outsole Base
    const soleMat = new THREE.MeshStandardMaterial({
      color: activeColor.sole,
      roughness: 0.3,
      metalness: 0.1
    });
    const soleGeo = new THREE.BoxGeometry(2.4, 0.22, 0.95);
    const soleMesh = new THREE.Mesh(soleGeo, soleMat);
    soleMesh.position.y = -0.6;
    soleMesh.castShadow = true;
    soleMesh.receiveShadow = true;
    shoeGroup.add(soleMesh);

    // 2. Midsole Nitrogen Foam
    const midMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.45,
      metalness: 0.05
    });
    const midGeo = new THREE.BoxGeometry(2.35, 0.26, 0.92);
    const midMesh = new THREE.Mesh(midGeo, midMat);
    midMesh.position.y = -0.36;
    midMesh.castShadow = true;
    shoeGroup.add(midMesh);

    // 3. Engineered Ballistic Mesh Upper
    const upperMat = new THREE.MeshStandardMaterial({
      color: activeColor.upper,
      roughness: 0.75,
      metalness: 0.1
    });
    const upperGeo = new THREE.CylinderGeometry(0.42, 0.52, 1.2, 32);
    upperGeo.rotateZ(Math.PI / 2);
    upperGeo.scale(1.8, 0.6, 0.85);
    const upperMesh = new THREE.Mesh(upperGeo, upperMat);
    upperMesh.position.set(0, 0.05, 0);
    upperMesh.castShadow = true;
    shoeGroup.add(upperMesh);

    // Heel Collar
    const collarMat = new THREE.MeshStandardMaterial({ color: activeColor.accent, roughness: 0.5 });
    const collarMesh = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.1, 16, 32), collarMat);
    collarMesh.position.set(-0.65, 0.45, 0);
    collarMesh.rotation.y = Math.PI / 2;
    shoeGroup.add(collarMesh);

    // 4. Dynamic Lacing Curve
    const laceMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    const laceCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.6, 0.25, 0.2),
      new THREE.Vector3(0.3, 0.4, -0.2),
      new THREE.Vector3(0.0, 0.45, 0.22),
      new THREE.Vector3(-0.3, 0.5, -0.18),
      new THREE.Vector3(-0.55, 0.55, 0.1)
    ]);
    const laceMesh = new THREE.Mesh(new THREE.TubeGeometry(laceCurve, 40, 0.025, 8, false), laceMat);
    shoeGroup.add(laceMesh);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Idle hovering
      shoeGroup.position.y = Math.sin(elapsed * 1.3) * 0.06;

      // Exploded View Dynamics
      if (exploded) {
        soleMesh.position.y = THREE.MathUtils.lerp(soleMesh.position.y, -1.2, 0.08);
        midMesh.position.y = THREE.MathUtils.lerp(midMesh.position.y, -0.65, 0.08);
        upperMesh.position.y = THREE.MathUtils.lerp(upperMesh.position.y, 0.45, 0.08);
        laceMesh.position.y = THREE.MathUtils.lerp(laceMesh.position.y, 0.55, 0.08);
      } else {
        soleMesh.position.y = THREE.MathUtils.lerp(soleMesh.position.y, -0.6, 0.08);
        midMesh.position.y = THREE.MathUtils.lerp(midMesh.position.y, -0.36, 0.08);
        upperMesh.position.y = THREE.MathUtils.lerp(upperMesh.position.y, 0.05, 0.08);
        laceMesh.position.y = THREE.MathUtils.lerp(laceMesh.position.y, 0, 0.08);
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
  }, [exploded, colorway]);

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
            backgroundColor: exploded ? '#D72638' : 'rgba(250, 248, 243, 0.9)',
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
          {exploded ? 'Assemble Sneaker' : 'Exploded View'}
        </button>

        {/* Colorway Swatches */}
        <div 
          style={{
            display: 'flex',
            gap: '8px',
            padding: '4px',
            backgroundColor: 'rgba(250, 248, 243, 0.9)',
            borderRadius: 'var(--radius-pill)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <button
            onClick={() => setColorway('red')}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#D72638',
              border: colorway === 'red' ? '2px solid #FFFFFF' : 'none',
              boxShadow: colorway === 'red' ? '0 0 0 1px #11110F' : 'none'
            }}
            title="Racing Red"
          />
          <button
            onClick={() => setColorway('black')}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#1A1A1A',
              border: colorway === 'black' ? '2px solid #FFFFFF' : 'none',
              boxShadow: colorway === 'black' ? '0 0 0 1px #11110F' : 'none'
            }}
            title="Stealth Black"
          />
          <button
            onClick={() => setColorway('lime')}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#9EE03A',
              border: colorway === 'lime' ? '2px solid #FFFFFF' : 'none',
              boxShadow: colorway === 'lime' ? '0 0 0 1px #11110F' : 'none'
            }}
            title="Electric Lime"
          />
        </div>
      </div>
    </div>
  );
};

export default KineticScene3D;
