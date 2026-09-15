import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const AtelierRingScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [metal, setMetal] = useState<'platinum' | 'gold' | 'rose'>('platinum');
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x11100e);

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 5.2);

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

    // High Dynamic Range Studio Environment
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, '#100f0e');
      grad.addColorStop(0.5, '#35312a');
      grad.addColorStop(1, '#0e0e0d');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);

      ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
      ctx.fillRect(140, 10, 232, 80);
      ctx.fillRect(20, 80, 40, 100);
      ctx.fillRect(450, 80, 40, 100);
    }
    const envTexture = new THREE.CanvasTexture(canvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;

    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    scene.environment = pmrem.fromEquirectangular(envTexture).texture;
    pmrem.dispose();
    envTexture.dispose();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfffaee, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff2e0, 4.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xdde8ff, 3.5);
    rimLight.position.set(-4, 3, 3);
    scene.add(rimLight);

    const ringGroup = new THREE.Group();
    ringGroup.rotation.x = 0.42;
    ringGroup.rotation.y = -0.4;
    ringGroup.rotation.z = -0.15;
    scene.add(ringGroup);

    // Metal Material definitions
    const metalColors = {
      platinum: { color: 0xebedf0, roughness: 0.12, metalness: 0.98 },
      gold: { color: 0xdeb552, roughness: 0.14, metalness: 0.95 },
      rose: { color: 0xdca086, roughness: 0.14, metalness: 0.95 }
    };
    const active = metalColors[metal];

    const metalMat = new THREE.MeshStandardMaterial({
      color: active.color,
      roughness: active.roughness,
      metalness: active.metalness,
      envMapIntensity: 4.0
    });

    // 1. Torus Band
    const bandGeo = new THREE.TorusGeometry(1.35, 0.16, 32, 96);
    const bandMesh = new THREE.Mesh(bandGeo, metalMat);
    bandMesh.castShadow = true;
    ringGroup.add(bandMesh);

    // 2. Crown Setting Group (Base ring, gallery rail, 6 curved prongs)
    const crownGroup = new THREE.Group();
    ringGroup.add(crownGroup);

    // Base Seat Ring
    const baseRing = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.06, 16, 32), metalMat);
    baseRing.position.y = 1.28;
    baseRing.rotation.x = Math.PI / 2;
    crownGroup.add(baseRing);

    // Gallery Basket Rail
    const rail = new THREE.Mesh(new THREE.TorusGeometry(0.64, 0.04, 16, 32), metalMat);
    rail.position.y = 1.54;
    rail.rotation.x = Math.PI / 2;
    crownGroup.add(rail);

    // 6 Curved Prongs
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const cosA = Math.cos(a);
      const sinA = Math.sin(a);
      const pts = [
        new THREE.Vector3(cosA * 0.36, 1.28, sinA * 0.36),
        new THREE.Vector3(cosA * 0.64, 1.54, sinA * 0.64),
        new THREE.Vector3(cosA * 0.95, 1.82, sinA * 0.95),
        new THREE.Vector3(cosA * 0.85, 1.95, sinA * 0.85)
      ];
      const curve = new THREE.CatmullRomCurve3(pts);
      const prong = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.042, 10, false), metalMat);
      crownGroup.add(prong);

      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), metalMat);
      tip.position.copy(pts[3]);
      crownGroup.add(tip);
    }

    // 3. Multi-Faceted Brilliant Solitaire Diamond (Outer Refractive + Inner Reflective Core)
    const diamondGroup = new THREE.Group();
    diamondGroup.position.set(0, 1.82, 0);
    ringGroup.add(diamondGroup);

    // Build 57-facet round brilliant geometry
    const positions: number[] = [];
    const normals: number[] = [];
    const R_girdle = 0.95;
    const R_table = 0.54;
    const H_crown = 0.34;
    const H_pavilion = 0.85;

    function addTri(p1: number[], p2: number[], p3: number[]) {
      const v1 = new THREE.Vector3(...p1);
      const v2 = new THREE.Vector3(...p2);
      const v3 = new THREE.Vector3(...p3);
      const cb = new THREE.Vector3().subVectors(v3, v2);
      const ab = new THREE.Vector3().subVectors(v1, v2);
      cb.cross(ab).normalize();
      positions.push(...p1, ...p2, ...p3);
      normals.push(cb.x, cb.y, cb.z, cb.x, cb.y, cb.z, cb.x, cb.y, cb.z);
    }

    // Table
    const T: number[][] = [];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      T.push([Math.cos(a) * R_table, H_crown, Math.sin(a) * R_table]);
    }
    for (let i = 0; i < 8; i++) {
      addTri([0, H_crown, 0], T[i], T[(i + 1) % 8]);
    }

    // Girdle top & bot
    const G_top: number[][] = [];
    const G_bot: number[][] = [];
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      G_top.push([Math.cos(a) * R_girdle, 0, Math.sin(a) * R_girdle]);
      G_bot.push([Math.cos(a) * R_girdle, -0.05, Math.sin(a) * R_girdle]);
    }

    // Crown facets
    for (let i = 0; i < 8; i++) {
      const gIdx = i * 2;
      addTri(T[i], G_top[gIdx], G_top[(gIdx + 1) % 16]);
      addTri(T[i], G_top[(gIdx + 1) % 16], T[(i + 1) % 8]);
      addTri(T[(i + 1) % 8], G_top[(gIdx + 1) % 16], G_top[(gIdx + 2) % 16]);
    }

    // Girdle band
    for (let i = 0; i < 16; i++) {
      const n = (i + 1) % 16;
      addTri(G_top[i], G_top[n], G_bot[i]);
      addTri(G_top[n], G_bot[n], G_bot[i]);
    }

    // Pavilion facets to culet
    const culet = [0, -H_pavilion, 0];
    for (let i = 0; i < 16; i++) {
      addTri(G_bot[i], culet, G_bot[(i + 1) % 16]);
    }

    const diaGeo = new THREE.BufferGeometry();
    diaGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    diaGeo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));

    // Inner Reflective Core (TIR)
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xf5f8ff,
      metalness: 0.95,
      roughness: 0.05,
      envMapIntensity: 5.5,
      flatShading: true
    });
    const innerMesh = new THREE.Mesh(diaGeo.clone(), innerMat);
    innerMesh.scale.setScalar(0.96);
    diamondGroup.add(innerMesh);

    // Outer Refractive Diamond Shell
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.76,
      ior: 2.417,
      thickness: 1.4,
      specularIntensity: 6.0,
      clearcoat: 1.0,
      envMapIntensity: 5.0,
      flatShading: true,
      transparent: true
    });
    const outerMesh = new THREE.Mesh(diaGeo, outerMat);
    outerMesh.castShadow = true;
    diamondGroup.add(outerMesh);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow beauty rotation
      ringGroup.rotation.y = -0.4 + Math.sin(elapsed * 0.25) * 0.2;

      // Exploded View
      if (exploded) {
        diamondGroup.position.y = THREE.MathUtils.lerp(diamondGroup.position.y, 2.7, 0.08);
        crownGroup.position.y = THREE.MathUtils.lerp(crownGroup.position.y, 0.4, 0.08);
      } else {
        diamondGroup.position.y = THREE.MathUtils.lerp(diamondGroup.position.y, 1.82, 0.08);
        crownGroup.position.y = THREE.MathUtils.lerp(crownGroup.position.y, 0, 0.08);
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
  }, [metal, exploded]);

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
          onClick={() => setExploded(!exploded)}
          style={{
            padding: '9px 16px',
            backgroundColor: exploded ? '#D4AF37' : 'rgba(250, 248, 243, 0.9)',
            color: exploded ? '#FFFFFF' : '#11110F',
            borderRadius: 'var(--radius-pill)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {exploded ? 'Assemble Ring' : 'Explode Setting'}
        </button>

        <div style={{ display: 'flex', gap: '6px', padding: '4px', backgroundColor: 'rgba(250, 248, 243, 0.9)', borderRadius: 'var(--radius-pill)' }}>
          <button
            onClick={() => setMetal('platinum')}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: metal === 'platinum' ? '#11110F' : 'transparent',
              color: metal === 'platinum' ? '#FFFFFF' : '#11110F',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: '600'
            }}
          >
            Platinum
          </button>
          <button
            onClick={() => setMetal('gold')}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: metal === 'gold' ? '#11110F' : 'transparent',
              color: metal === 'gold' ? '#FFFFFF' : '#11110F',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: '600'
            }}
          >
            Yellow Gold
          </button>
          <button
            onClick={() => setMetal('rose')}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: metal === 'rose' ? '#11110F' : 'transparent',
              color: metal === 'rose' ? '#FFFFFF' : '#11110F',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: '600'
            }}
          >
            Rose Gold
          </button>
        </div>
      </div>
    </div>
  );
};
