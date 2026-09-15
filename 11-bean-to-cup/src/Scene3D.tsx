import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const BeanToCupScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<1 | 2 | 3>(2);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x13110f);

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 4.8);

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

    // Technical Machine Lighting
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.6);
    scene.add(ambientLight);

    const keySpot = new THREE.SpotLight(0xfffaee, 4.5, 14, Math.PI / 4, 0.3);
    keySpot.position.set(3, 5, 3);
    keySpot.castShadow = true;
    scene.add(keySpot);

    const machineGroup = new THREE.Group();
    scene.add(machineGroup);

    // 1. Transparent Bean Hopper (Top)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      ior: 1.5,
      roughness: 0.05,
      thickness: 0.8,
      transparent: true
    });
    const hopper = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.35, 0.9, 32), glassMat);
    hopper.position.y = 1.35;
    machineGroup.add(hopper);

    // Coffee Beans inside hopper
    const beanMat = new THREE.MeshStandardMaterial({ color: 0x4a2a16, roughness: 0.7 });
    const beans: THREE.Mesh[] = [];
    for (let i = 0; i < 24; i++) {
      const bean = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), beanMat);
      bean.scale.set(1.4, 0.9, 1.1);
      const r = Math.random() * 0.45;
      const a = Math.random() * Math.PI * 2;
      bean.position.set(Math.cos(a) * r, 1.15 + Math.random() * 0.5, Math.sin(a) * r);
      machineGroup.add(bean);
      beans.push(bean);
    }

    // 2. Stainless Steel Grinder / Portafilter Group (Middle)
    const steelMat = new THREE.MeshStandardMaterial({ color: 0xd8dde4, metalness: 0.92, roughness: 0.15 });
    const portafilter = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.46, 0.4, 32), steelMat);
    portafilter.position.y = 0.5;
    portafilter.castShadow = true;
    machineGroup.add(portafilter);

    // Handle
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.4 });
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.1, 16), handleMat);
    handle.rotation.z = Math.PI / 2;
    handle.position.set(0.75, 0.5, 0);
    machineGroup.add(handle);

    // 3. Copper Heating Coil
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xc4693b,
      metalness: 0.9,
      roughness: 0.25,
      emissive: 0xff3300,
      emissiveIntensity: stage === 2 ? 0.4 : 0.05
    });
    const coilCurvePoints: THREE.Vector3[] = [];
    for (let i = 0; i < 40; i++) {
      const t = (i / 40) * Math.PI * 8;
      coilCurvePoints.push(new THREE.Vector3(Math.cos(t) * 0.28, 0.2 + (i / 40) * 0.55, Math.sin(t) * 0.28));
    }
    const coilCurve = new THREE.CatmullRomCurve3(coilCurvePoints);
    const coil = new THREE.Mesh(new THREE.TubeGeometry(coilCurve, 50, 0.025, 8, false), copperMat);
    coil.position.set(-0.85, 0.2, 0);
    machineGroup.add(coil);

    // 4. Espresso Extraction Glass & Stream (Bottom)
    const glassCup = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.35, 0.7, 32), glassMat);
    glassCup.position.set(0, -0.4, 0);
    machineGroup.add(glassCup);

    // Crema & Liquid
    const cremaMat = new THREE.MeshStandardMaterial({ color: 0xb5783d, roughness: 0.4 });
    const espressoLiquid = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.33, 0.45, 24), cremaMat);
    espressoLiquid.position.set(0, -0.48, 0);
    machineGroup.add(espressoLiquid);

    // Extraction stream
    const streamMat = new THREE.MeshPhysicalMaterial({ color: 0x3d2010, roughness: 0.1, transmission: 0.6 });
    const stream = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.55, 12), streamMat);
    stream.position.set(0, -0.05, 0);
    machineGroup.add(stream);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow machine inspection turn
      machineGroup.rotation.y = Math.sin(elapsed * 0.2) * 0.15;

      // Beans jitter in hopper when grinding
      if (stage === 1) {
        beans.forEach((b, i) => {
          b.position.y += Math.sin(elapsed * 12.0 + i) * 0.003;
        });
      }

      // Stream pulse
      stream.scale.set(1 + Math.sin(elapsed * 8.0) * 0.1, 1, 1);

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
            padding: '9px 16px',
            backgroundColor: stage === 1 ? '#A06535' : 'rgba(250, 248, 243, 0.9)',
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
          1. Bean Grinding
        </button>

        <button
          onClick={() => setStage(2)}
          style={{
            padding: '9px 16px',
            backgroundColor: stage === 2 ? '#A06535' : 'rgba(250, 248, 243, 0.9)',
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
          2. 9-Bar Pressurization
        </button>

        <button
          onClick={() => setStage(3)}
          style={{
            padding: '9px 16px',
            backgroundColor: stage === 3 ? '#A06535' : 'rgba(250, 248, 243, 0.9)',
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
          3. Crema Pour
        </button>
      </div>
    </div>
  );
};

export default BeanToCupScene3D;
