(function () {
  const canvas = document.getElementById("three-canvas");
  if (!canvas || typeof THREE === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const BASE = (function () {
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      const s = scripts[i].src || "";
      if (s.indexOf("three-scene.js") !== -1) {
        return s.replace(/js\/three-scene\.js.*$/, "");
      }
    }
    return "";
  })();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    55,
    canvas.clientWidth / canvas.clientHeight || window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0.2, 6.2);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight, false);
  renderer.setClearColor(0x000000, 0);

  const ambient = new THREE.AmbientLight(0x6366f1, 0.45);
  scene.add(ambient);
  const key = new THREE.PointLight(0xd4a853, 1.1, 40);
  key.position.set(4, 3, 5);
  scene.add(key);
  const fill = new THREE.PointLight(0x4f46e5, 0.7, 40);
  fill.position.set(-5, -1, 3);
  scene.add(fill);

  // Floating particles
  const COUNT = 420;
  const positions = new Float32Array(COUNT * 3);
  const speeds = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    speeds[i] = 0.15 + Math.random() * 0.35;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0xd4a853,
    size: 0.035,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  // Soft indigo dust
  const COUNT2 = 180;
  const pos2 = new Float32Array(COUNT2 * 3);
  for (let i = 0; i < COUNT2; i++) {
    pos2[i * 3] = (Math.random() - 0.5) * 14;
    pos2[i * 3 + 1] = (Math.random() - 0.5) * 9;
    pos2[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
  }
  const pGeo2 = new THREE.BufferGeometry();
  pGeo2.setAttribute("position", new THREE.BufferAttribute(pos2, 3));
  const pMat2 = new THREE.PointsMaterial({
    color: 0x818cf8,
    size: 0.05,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  scene.add(new THREE.Points(pGeo2, pMat2));

  const loader = new THREE.TextureLoader();
  loader.crossOrigin = "anonymous";

  const planes = [];
  const imagePaths = [
    BASE + "assets/ai/anuj-ai-portrait.png",
    BASE + "assets/ai/anuj-hero-banner.png",
    BASE + "assets/photos/hero-studio.jpg",
    BASE + "assets/photos/hero-chair.jpg",
    BASE + "assets/photos/hero-night.jpg",
    BASE + "assets/photos/hero-profile.jpg",
  ];

  const layout = [
    { x: -3.4, y: 1.1, z: -1.2, rotY: 0.35, w: 1.6, h: 2.0 },
    { x: 3.2, y: -0.3, z: -1.8, rotY: -0.4, w: 2.4, h: 1.2 },
    { x: -2.6, y: -1.3, z: -0.6, rotY: 0.25, w: 1.3, h: 1.6 },
    { x: 2.4, y: 1.4, z: -0.9, rotY: -0.2, w: 1.2, h: 1.5 },
    { x: 0.2, y: -1.8, z: -2.2, rotY: 0.1, w: 1.8, h: 1.0 },
    { x: -0.8, y: 1.7, z: -2.5, rotY: -0.15, w: 1.1, h: 1.4 },
  ];

  imagePaths.forEach((src, i) => {
    loader.load(
      src,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace || THREE.sRGBEncoding;
        const L = layout[i] || layout[0];
        const geo = new THREE.PlaneGeometry(L.w, L.h);
        const mat = new THREE.MeshStandardMaterial({
          map: tex,
          transparent: true,
          opacity: 0.82,
          metalness: 0.15,
          roughness: 0.7,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(L.x, L.y, L.z);
        mesh.rotation.y = L.rotY;
        mesh.userData = { baseY: L.y, phase: Math.random() * Math.PI * 2, amp: 0.12 + Math.random() * 0.1 };
        // subtle gold rim frame as slightly larger dark plane behind
        const frame = new THREE.Mesh(
          new THREE.PlaneGeometry(L.w + 0.08, L.h + 0.08),
          new THREE.MeshBasicMaterial({ color: 0xd4a853, transparent: true, opacity: 0.35 })
        );
        frame.position.z = -0.01;
        mesh.add(frame);
        scene.add(mesh);
        planes.push(mesh);
      },
      undefined,
      () => {}
    );
  });

  // Book-like thin boxes
  for (let i = 0; i < 5; i++) {
    const book = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 1.0, 0.08),
      new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x312e81 : 0x1e293b,
        metalness: 0.3,
        roughness: 0.55,
        emissive: 0xd4a853,
        emissiveIntensity: 0.05,
      })
    );
    book.position.set((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4, -3 - Math.random() * 2);
    book.rotation.set(Math.random() * 0.4, Math.random() * Math.PI, Math.random() * 0.2);
    book.userData = { baseY: book.position.y, phase: Math.random() * 6, amp: 0.2 };
    scene.add(book);
    planes.push(book);
  }

  let t = 0;
  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener("pointermove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.6;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.35;
  });

  function onResize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  window.addEventListener("resize", onResize);

  function animate() {
    requestAnimationFrame(animate);
    t += 0.008;
    const pos = points.geometry.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 1] += Math.sin(t * speeds[i] + i) * 0.002;
      if (pos[i * 3 + 1] > 5) pos[i * 3 + 1] = -5;
    }
    points.geometry.attributes.position.needsUpdate = true;
    points.rotation.y = t * 0.05;

    planes.forEach((m) => {
      if (m.userData && m.userData.baseY !== undefined) {
        m.position.y = m.userData.baseY + Math.sin(t + m.userData.phase) * m.userData.amp;
        m.rotation.z = Math.sin(t * 0.4 + m.userData.phase) * 0.03;
      }
    });

    camera.position.x += (mouseX - camera.position.x) * 0.04;
    camera.position.y += (-mouseY + 0.2 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();
})();
