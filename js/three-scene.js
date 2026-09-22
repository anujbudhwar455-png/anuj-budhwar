/**
 * Immersive Three.js hero (r160+) — floating books, vinyl discs, particles.
 * Respects prefers-reduced-motion.
 */
(function () {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bookCovers = Array.isArray(window.__PORTFOLIO_BOOK_COVERS__)
    ? window.__PORTFOLIO_BOOK_COVERS__
    : [];
  const musicCovers = Array.isArray(window.__PORTFOLIO_MUSIC_COVERS__)
    ? window.__PORTFOLIO_MUSIC_COVERS__
    : [];

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07090f, 0.045);

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0.4, 8.5);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x07090f, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Lighting
  scene.add(new THREE.AmbientLight(0x8b9cff, 0.45));
  const key = new THREE.DirectionalLight(0xffe6b8, 1.15);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x6366f1, 0.85);
  rim.position.set(-5, -2, -3);
  scene.add(rim);
  const point = new THREE.PointLight(0xd4a853, 1.4, 24);
  point.position.set(0, 1.5, 2);
  scene.add(point);

  const loader = new THREE.TextureLoader();
  loader.crossOrigin = 'anonymous';

  function loadTex(url) {
    return new Promise((resolve) => {
      loader.load(
        url,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
          resolve(tex);
        },
        undefined,
        () => resolve(null)
      );
    });
  }

  const booksGroup = new THREE.Group();
  const discsGroup = new THREE.Group();
  scene.add(booksGroup);
  scene.add(discsGroup);

  function makeBook(tex, x, y, z, rotY) {
    const w = 1.05;
    const h = 1.55;
    const d = 0.12;
    const g = new THREE.BoxGeometry(w, h, d);
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7, metalness: 0.15 }),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7, metalness: 0.1 }),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.65 }),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.65 }),
      new THREE.MeshStandardMaterial({
        map: tex || null,
        color: tex ? 0xffffff : 0x6366f1,
        roughness: 0.55,
        metalness: 0.05,
      }),
      new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.8 }),
    ];
    const mesh = new THREE.Mesh(g, materials);
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotY;
    mesh.rotation.x = (Math.random() - 0.5) * 0.25;
    mesh.userData = {
      baseY: y,
      baseX: x,
      phase: Math.random() * Math.PI * 2,
      speed: 0.35 + Math.random() * 0.45,
      spin: (Math.random() - 0.5) * 0.25,
    };
    booksGroup.add(mesh);
    return mesh;
  }

  function makeVinyl(tex, x, y, z) {
    const group = new THREE.Group();
    const discGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.04, 48);
    const discMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      roughness: 0.35,
      metalness: 0.55,
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.rotation.x = Math.PI / 2;

    const labelGeo = new THREE.CircleGeometry(0.32, 48);
    const labelMat = new THREE.MeshStandardMaterial({
      map: tex || null,
      color: tex ? 0xffffff : 0xd4a853,
      roughness: 0.5,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
    const label = new THREE.Mesh(labelGeo, labelMat);
    label.position.z = 0.025;

    const ringGeo = new THREE.RingGeometry(0.34, 0.7, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.4,
      metalness: 0.7,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.z = 0.022;

    group.add(disc);
    group.add(ring);
    group.add(label);
    group.position.set(x, y, z);
    group.rotation.x = -0.55 + Math.random() * 0.3;
    group.userData = {
      baseY: y,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.5,
      spin: 0.6 + Math.random() * 0.8,
    };
    discsGroup.add(group);
    return group;
  }

  // Particles
  const pCount = reduceMotion ? 80 : 420;
  const pGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(pCount * 3);
  const colors = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
    const gold = Math.random() > 0.55;
    colors[i * 3] = gold ? 0.83 : 0.39;
    colors[i * 3 + 1] = gold ? 0.66 : 0.4;
    colors[i * 3 + 2] = gold ? 0.33 : 0.95;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const pMat = new THREE.PointsMaterial({
    size: 0.035,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // Soft ground glow plane
  const glowGeo = new THREE.CircleGeometry(6, 64);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x312e81,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = -2.6;
  scene.add(glow);

  const bookSlots = [
    [-3.2, 0.6, -1.2, 0.35],
    [-1.6, 1.3, -2.4, -0.2],
    [0.2, 0.2, -1.6, 0.15],
    [1.8, 1.1, -2.0, -0.4],
    [3.3, 0.4, -1.0, 0.25],
    [-2.5, -0.8, -3.0, 0.5],
    [2.4, -0.6, -2.8, -0.3],
    [0.0, -1.2, -3.5, 0.1],
  ];
  const discSlots = [
    [-3.8, 1.8, 0.2],
    [3.6, 1.5, 0.5],
    [-1.0, -1.5, -0.5],
    [1.2, 2.0, -0.8],
    [4.0, -0.2, -1.5],
    [-4.2, -0.4, -1.2],
  ];

  async function populate() {
    const bTex = await Promise.all(bookCovers.slice(0, 8).map(loadTex));
    const mTex = await Promise.all(musicCovers.slice(0, 6).map(loadTex));
    bookSlots.forEach((slot, i) => {
      makeBook(bTex[i % Math.max(bTex.length, 1)] || null, slot[0], slot[1], slot[2], slot[3]);
    });
    discSlots.forEach((slot, i) => {
      makeVinyl(mTex[i % Math.max(mTex.length, 1)] || null, slot[0], slot[1], slot[2]);
    });
  }

  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;

  function onPointer(e) {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    const nx = (x / window.innerWidth) * 2 - 1;
    const ny = (y / window.innerHeight) * 2 - 1;
    targetX = nx;
    targetY = ny;
  }
  if (!reduceMotion) {
    window.addEventListener('pointermove', onPointer, { passive: true });
  }

  function resize() {
    const parent = canvas.parentElement || document.body;
    const w = parent.clientWidth || window.innerWidth;
    const h = parent.clientHeight || window.innerHeight;
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  window.addEventListener('resize', resize);
  resize();

  const clock = new THREE.Clock();
  let raf = 0;

  function animate() {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    pointerX += (targetX - pointerX) * 0.04;
    pointerY += (targetY - pointerY) * 0.04;

    if (!reduceMotion) {
      booksGroup.children.forEach((m) => {
        const u = m.userData;
        m.position.y = u.baseY + Math.sin(t * u.speed + u.phase) * 0.22;
        m.rotation.y += u.spin * 0.01;
        m.rotation.z = Math.sin(t * 0.3 + u.phase) * 0.08;
      });
      discsGroup.children.forEach((g) => {
        const u = g.userData;
        g.position.y = u.baseY + Math.sin(t * u.speed + u.phase) * 0.28;
        g.rotation.z += u.spin * 0.012;
      });
      particles.rotation.y = t * 0.02;
      booksGroup.rotation.y = pointerX * 0.18;
      discsGroup.rotation.y = pointerX * 0.12;
      camera.position.x = pointerX * 0.55;
      camera.position.y = 0.4 + pointerY * -0.35;
      camera.lookAt(0, 0.2, -1);
      point.intensity = 1.2 + Math.sin(t * 1.2) * 0.25;
    } else {
      camera.lookAt(0, 0.2, -1);
    }

    renderer.render(scene, camera);
  }

  populate().then(() => {
    animate();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      animate();
    }
  });
})();
