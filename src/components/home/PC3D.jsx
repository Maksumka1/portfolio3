import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function PC3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth, H = el.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Lights
    const ambient = new THREE.AmbientLight(0x1a1a2e, 2);
    scene.add(ambient);
    const blueLight = new THREE.PointLight(0x2D5BFF, 8, 12);
    blueLight.position.set(2, 2, 3);
    scene.add(blueLight);
    const cyanLight = new THREE.PointLight(0x00ffff, 4, 10);
    cyanLight.position.set(-2, -1, 2);
    scene.add(cyanLight);
    const pinkLight = new THREE.PointLight(0xff00aa, 3, 8);
    pinkLight.position.set(0, 3, -2);
    scene.add(pinkLight);

    const group = new THREE.Group();
    scene.add(group);

    // --- PC Case (main body) ---
    const caseMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a0f,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.92,
    });
    const caseGeo = new THREE.BoxGeometry(1.6, 2.2, 0.9);
    const pcCase = new THREE.Mesh(caseGeo, caseMat);
    group.add(pcCase);

    // Glass panel (transparent side)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x88aaff,
      metalness: 0,
      roughness: 0,
      transparent: true,
      opacity: 0.12,
      transmission: 0.9,
      thickness: 0.05,
    });
    const glassGeo = new THREE.PlaneGeometry(1.55, 2.15);
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.set(0.8, 0, 0);
    glass.rotation.y = Math.PI / 2;
    group.add(glass);

    // Case frame edges
    const edgeMat = new THREE.MeshPhysicalMaterial({ color: 0x2D5BFF, metalness: 1, roughness: 0.1, emissive: 0x2D5BFF, emissiveIntensity: 0.3 });
    const addEdge = (w, h, d, x, y, z) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), edgeMat);
      m.position.set(x, y, z);
      group.add(m);
    };
    addEdge(0.04, 2.2, 0.04, 0.8, 0, 0.45);
    addEdge(0.04, 2.2, 0.04, 0.8, 0, -0.45);
    addEdge(0.04, 2.2, 0.04, -0.8, 0, 0.45);
    addEdge(0.04, 2.2, 0.04, -0.8, 0, -0.45);

    // --- GPU ---
    const gpuMat = new THREE.MeshPhysicalMaterial({ color: 0x111122, metalness: 0.9, roughness: 0.15 });
    const gpu = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.22, 0.55), gpuMat);
    gpu.position.set(0, -0.3, 0);
    group.add(gpu);
    // GPU fans
    const fanMat = new THREE.MeshPhysicalMaterial({ color: 0x0a0a1a, metalness: 0.7, roughness: 0.3, emissive: 0x1144ff, emissiveIntensity: 0.2 });
    for (let i = -1; i <= 1; i++) {
      const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.04, 16), fanMat);
      fan.rotation.x = Math.PI / 2;
      fan.position.set(i * 0.38, -0.3, 0.28);
      group.add(fan);
    }

    // --- Motherboard ---
    const mbMat = new THREE.MeshPhysicalMaterial({ color: 0x0d1a0d, metalness: 0.3, roughness: 0.7 });
    const mb = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.8, 0.03), mbMat);
    mb.position.set(0, 0, -0.4);
    group.add(mb);

    // --- AIO Cooler (360mm radiator) ---
    const aioMat = new THREE.MeshPhysicalMaterial({ color: 0x0a0a12, metalness: 0.8, roughness: 0.2 });
    const radiator = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.14, 0.5), aioMat);
    radiator.position.set(0, 0.9, 0);
    group.add(radiator);

    // --- Liquid cooling tubes (glowing) ---
    const tubeMat = new THREE.MeshPhysicalMaterial({
      color: 0x00e5ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.7,
    });

    const tubePoints1 = [
      new THREE.Vector3(0.2, 0.75, 0.1),
      new THREE.Vector3(0.4, 0.3, 0.2),
      new THREE.Vector3(0.5, -0.1, 0.15),
      new THREE.Vector3(0.35, -0.55, 0.1),
    ];
    const tubePoints2 = [
      new THREE.Vector3(-0.2, 0.75, 0.1),
      new THREE.Vector3(-0.4, 0.3, 0.2),
      new THREE.Vector3(-0.5, -0.1, 0.15),
      new THREE.Vector3(-0.35, -0.55, 0.1),
    ];

    [tubePoints1, tubePoints2].forEach(pts => {
      const curve = new THREE.CatmullRomCurve3(pts);
      const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.018, 8, false);
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      group.add(tube);
    });

    // Pump block (glowing)
    const pumpMat = new THREE.MeshPhysicalMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 2, transparent: true, opacity: 0.85 });
    const pump = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), pumpMat);
    pump.position.set(0, -0.55, 0.15);
    group.add(pump);

    // --- RAM sticks (RGB top) ---
    const ramMat = new THREE.MeshPhysicalMaterial({ color: 0x111122, metalness: 0.8, roughness: 0.2 });
    const rgbMat = new THREE.MeshPhysicalMaterial({ color: 0x2D5BFF, emissive: 0x2D5BFF, emissiveIntensity: 1.5 });
    for (let i = 0; i < 4; i++) {
      const ram = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.45, 0.02), ramMat);
      const xOff = -0.3 + i * 0.12;
      ram.position.set(xOff, 0.35, -0.36);
      group.add(ram);
      const rgb = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.04, 0.025), rgbMat);
      rgb.position.set(xOff, 0.59, -0.36);
      group.add(rgb);
    }

    // --- SSD (M.2) ---
    const ssdMat = new THREE.MeshPhysicalMaterial({ color: 0x0a0a0a, metalness: 0.6, roughness: 0.4 });
    const ssd = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.07, 0.02), ssdMat);
    ssd.position.set(0.2, 0.05, -0.36);
    group.add(ssd);

    // --- PSU ---
    const psuMat = new THREE.MeshPhysicalMaterial({ color: 0x080810, metalness: 0.7, roughness: 0.3 });
    const psu = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.35, 0.55), psuMat);
    psu.position.set(0, -0.92, 0);
    group.add(psu);

    // RGB strip at bottom
    const rgbStripMat = new THREE.MeshPhysicalMaterial({ color: 0x2D5BFF, emissive: 0x2D5BFF, emissiveIntensity: 2 });
    const strip = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.015, 0.85), rgbStripMat);
    strip.position.set(0, -1.06, 0);
    group.add(strip);

    // Floating ambient particles around PC
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 60;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({ color: 0x2D5BFF, size: 0.03, transparent: true, opacity: 0.5 });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Animate
    let t = 0;
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.008;

      // Slow rotation + floating
      group.rotation.y = t * 0.4;
      group.position.y = Math.sin(t * 0.7) * 0.12;
      group.rotation.z = Math.sin(t * 0.3) * 0.04;

      // Pulse liquid cooling glow
      const pulse = (Math.sin(t * 3) * 0.5 + 0.5);
      tubeMat.emissiveIntensity = 1.2 + pulse * 0.8;
      pumpMat.emissiveIntensity = 1.5 + pulse * 1.5;
      cyanLight.intensity = 3 + pulse * 2;

      // RGB color cycling
      const hue = (t * 30) % 360;
      const color = new THREE.Color(`hsl(${hue}, 100%, 60%)`);
      rgbMat.emissive = color;
      rgbStripMat.emissive = color;
      edgeMat.emissive = color;
      edgeMat.emissiveIntensity = 0.15 + pulse * 0.25;

      // Particle drift
      particlesMesh.rotation.y = t * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!el) return;
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}