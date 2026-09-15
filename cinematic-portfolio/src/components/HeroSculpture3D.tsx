import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePortfolioStore } from '../store/portfolioStore';
import { sound } from '../audio/soundEngine';

export const HeroSculpture3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const setActiveProject = usePortfolioStore((state) => state.setActiveProject);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5); // Initial camera position, will interpolate to 5.5

    // 2. High-Fidelity WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL init failed', e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // 3. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 4.0);
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    const coolRim = new THREE.DirectionalLight(0xdceaff, 3.2);
    coolRim.position.set(-5, -2, -3);
    scene.add(coolRim);

    const softFill = new THREE.DirectionalLight(0xffe8d1, 2.5);
    softFill.position.set(0, -4, 4);
    scene.add(softFill);

    // 4. Procedural Studio HDRI Environment Map
    const envCanvas = document.createElement('canvas');
    envCanvas.width = 512;
    envCanvas.height = 256;
    const ctx = envCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, '#1c1b18');
      grad.addColorStop(0.5, '#3a3630');
      grad.addColorStop(1, '#0e0e0d');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);

      // Top softbox
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fillRect(100, 10, 312, 90);
      // Lateral rim
      ctx.fillStyle = 'rgba(255, 240, 210, 0.7)';
      ctx.fillRect(40, 90, 40, 120);
      ctx.fillRect(430, 90, 40, 120);
    }
    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;
    scene.environment = envMap;
    pmremGenerator.dispose();
    envTexture.dispose();

    // 5. The Sculptural Kinetic Object (Metal, Glass, Fabric, Fluid)
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Component A: Polished Gold & Champagne Metal Torus / Helix (Jewelry & Engineering)
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0xd6b36a,
      metalness: 0.96,
      roughness: 0.12,
      envMapIntensity: 4.5
    });
    const metalGeo = new THREE.TorusGeometry(1.25, 0.14, 32, 96);
    const metalMesh = new THREE.Mesh(metalGeo, metalMat);
    metalMesh.rotation.x = Math.PI / 3;
    masterGroup.add(metalMesh);

    // Component B: Refractive Crystal Glass Monolith (Architecture & Fragrance)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.02,
      transmission: 0.88,
      ior: 1.58,
      thickness: 1.4,
      specularIntensity: 4.5,
      clearcoat: 1.0,
      envMapIntensity: 4.0,
      transparent: true
    });
    const glassGeo = new THREE.BoxGeometry(0.72, 2.3, 0.72);
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.rotation.y = Math.PI / 4;
    masterGroup.add(glassMesh);

    // Component C: Translucent Organic Fluid Form (Culinary & Skincare)
    const fluidMat = new THREE.MeshPhysicalMaterial({
      color: 0xe89f68,
      metalness: 0.1,
      roughness: 0.15,
      transmission: 0.65,
      ior: 1.38,
      thickness: 0.9,
      envMapIntensity: 3.0,
      transparent: true
    });
    const fluidGeo = new THREE.TorusKnotGeometry(0.65, 0.16, 96, 24, 2, 3);
    const fluidMesh = new THREE.Mesh(fluidGeo, fluidMat);
    fluidMesh.position.set(0.4, -0.2, 0.3);
    masterGroup.add(fluidMesh);

    // Component D: Architectural Matte Stone Core (Interiors & Real Estate)
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x22211e,
      metalness: 0.2,
      roughness: 0.85
    });
    const stoneGeo = new THREE.CylinderGeometry(0.32, 0.38, 1.4, 32);
    const stoneMesh = new THREE.Mesh(stoneGeo, stoneMat);
    stoneMesh.position.set(-0.35, 0.3, -0.2);
    masterGroup.add(stoneMesh);

    // Components array for subtle separation on pointer move
    const components = [
      { mesh: metalMesh, basePos: new THREE.Vector3(0, 0, 0), dir: new THREE.Vector3(0.3, 0.2, 0) },
      { mesh: glassMesh, basePos: new THREE.Vector3(0, 0, 0), dir: new THREE.Vector3(-0.25, -0.3, 0.2) },
      { mesh: fluidMesh, basePos: new THREE.Vector3(0.4, -0.2, 0.3), dir: new THREE.Vector3(0.2, 0.3, -0.15) },
      { mesh: stoneMesh, basePos: new THREE.Vector3(-0.35, 0.3, -0.2), dir: new THREE.Vector3(-0.3, 0.2, -0.2) }
    ];

    // 6. Pointer & Animation Loop Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let separationAmount = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetRotY = x * 0.14; // Max ~5 degrees
      targetRotX = -y * 0.12;
      separationAmount = Math.min(1, Math.sqrt(x * x + y * y));
    };

    window.addEventListener('mousemove', handlePointerMove);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();
    let startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      const now = performance.now();
      const introProgress = Math.min(1, (now - startTime) / 1600); // 1.6s entry

      // Camera smooth zoom entry from 7.5 to 5.5
      camera.position.z = THREE.MathUtils.lerp(7.5, 5.5, introProgress);

      // Continuous Idle Rotation (1.5 degrees per second) + pointer offset
      masterGroup.rotation.y += 0.005;
      masterGroup.rotation.x = THREE.MathUtils.lerp(masterGroup.rotation.x, targetRotX, 0.05);
      masterGroup.rotation.z = THREE.MathUtils.lerp(masterGroup.rotation.z, -targetRotY * 0.5, 0.05);

      // Gentle floating levitation
      masterGroup.position.y = Math.sin(elapsed * 1.1) * 0.08;

      // Subtly separate components based on pointer distance
      components.forEach((c) => {
        c.mesh.position.x = c.basePos.x + c.dir.x * separationAmount * 0.45;
        c.mesh.position.y = c.basePos.y + c.dir.y * separationAmount * 0.45;
        c.mesh.position.z = c.basePos.z + c.dir.z * separationAmount * 0.45;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
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
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section 
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '80px',
        paddingBottom: '40px'
      }}
    >
      {/* 3D WebGL Canvas Layer */}
      <div 
        ref={containerRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 'clamp(360px, 58vw, 920px)',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'auto',
          cursor: 'grab'
        }}
        aria-label="Interactive 3D Hero Kinetic Sculpture. Move cursor to interact."
        role="img"
      />

      {/* Editorial Content Foreground */}
      <div 
        className="container-wide"
        style={{
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'none',
          width: '100%'
        }}
      >
        <div style={{ maxWidth: '680px', pointerEvents: 'auto' }}>
          
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{ width: '28px', height: '1px', backgroundColor: 'var(--accent-champagne)' }} />
            <span className="label-tech-accent">
              CREATIVE DEVELOPMENT · 3D · INTERACTION
            </span>
          </div>

          {/* Display Hero Heading */}
          <h1
            style={{
              fontFamily: 'var(--font-display-serif)',
              fontSize: 'clamp(52px, 7.2vw, 120px)',
              lineHeight: 0.92,
              fontWeight: '400',
              letterSpacing: '-0.035em',
              color: 'var(--text-primary)',
              marginBottom: '28px'
            }}
          >
            Digital experiences <br />
            with <em style={{ fontStyle: 'italic', fontWeight: '300' }}>depth.</em>
          </h1>

          {/* Supporting Text */}
          <p
            style={{
              fontSize: 'clamp(16px, 1.25vw, 19px)',
              lineHeight: 1.68,
              color: 'var(--text-secondary)',
              maxWidth: '520px',
              marginBottom: '40px'
            }}
          >
            I design and build cinematic, interactive worlds for products, spaces, and ambitious brands. Fusing design elegance with genuine WebGL engineering.
          </p>

          {/* Action CTAs & Project Counter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
            <a
              href="#work"
              onClick={() => sound.play('click')}
              className="btn-editorial btn-editorial-primary"
            >
              Explore Selected Work
            </a>

            <a
              href="#contact"
              onClick={() => sound.play('click')}
              className="btn-editorial btn-editorial-outline"
            >
              Start a Project
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-champagne)' }} />
              <span className="label-tech" style={{ color: 'var(--text-primary)' }}>
                15 Selected Experiences
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div 
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          pointerEvents: 'none',
          opacity: 0.75
        }}
      >
        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-secondary)' }}>
          SCROLL TO EXPLORE
        </span>
        <span style={{ width: '1px', height: '24px', backgroundColor: 'var(--accent-champagne)' }} />
      </div>

    </section>
  );
};
